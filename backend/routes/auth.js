const express = require("express");
const User = require("../modal/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");


const JWT_SECRET = "Nazirisagoodb@y";

//  ROUTE 1: Create a User using: Post "/api/auth/createuser" (endpoint)  dosen't require authentication or no login reuquired

router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password Must Be At Least 5 Character").isLength({min: 5,}),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success ,errors: errors.array() });
    }
    try {
      // Check Whether the user with this email exists already

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "Sorry this Email is Already Exists" });
      }

      const salt = await bcrypt.genSalt(10); // ye promise retun krta hai
      const secPass = await bcrypt.hash(req.body.password, salt); // awati is kiye kyonki ye promise return krta hai

      // Create a New User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(authtoken);
      //   .then(user => res.json(user))
      //   .catch(err=> {console.log(err)
      // res.json({error:'Please Enter Unique Value for Email', message: err.message})})
      //  res.json(user)
      success = true; 
      res.json({ success, authtoken });
    } catch (error) {
      // Catch Errors
      console.error(error.message);
      res.status(500).send("Some Erroe Occured");
    }
  }
);

//  ROUTE 2: Authenticate a User using: Post "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password Cannot Be Blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // yaha email aur password ko body se baher nikal raha hoon
    try {
      let user = await User.findOne({ email }); // yaha hum user ka email verify krenge
      if (!user) {
        success = false
        return res.status(400).json({ error: "Enter Valid Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password); // password compare krenge
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Enter Valid Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//  ROUTE 3: Get Loggedin User Details using : Post "/api/auth/getuser" . Login required
router.post( "/getuser", fetchuser, async (req, res) => {

 try {
  userId = req.user.id;
  const user =  await User.findById(userId).select("-password") // jaise user id aa jayega mere sari field select kar sakta hoon password bhi
  res.send(user)
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
});
module.exports = router; 
