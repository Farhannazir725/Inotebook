const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
var Note = require("../modal/Note");
const { body, validationResult } = require("express-validator");

//  ROUTE 1: Get All The Notes using : Get "/api/auth/fetchallnotes"  Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  // ye endpoint hame data base se data fetch krke dega
  try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//  ROUTE 2: Add a New Note using : POST "/api/auth/addnote"  Login required
router.post(
  "/addnote",
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Description must be atLeast 5 Character").isLength({min: 5, }),],fetchuser,
    async (req, res) => {
    try {
    const {title,description,tag} = req.body; 
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({ // ye new noe simply ek promise return karega
        // me is me .save run kr sakta hoon wo bhi ek promise return karega
        title, description, tag, user: req.user.id
    })
    const saveNote = await note.save()  //  mujhe note return krega
    res.json(saveNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
  }
);
//  ROUTE 3: Update and Existing Note : PUT "/api/auth/updatenote"  Login required
    router.put( // put ham update ke liye use kr rahe hai 
    "/updatenote/:id", fetchuser, async (req, res) => {
     const {title,description,tag} = req.body;  // destruction se ham hmari sari chize layenge
      try {
        
      
     // Create A new note
     const newNote = {};  // yaha hum new note create karenge
     if(title){newNote.title = title};
     if(description){newNote.description = description};
     if(tag){newNote.tag = tag};

     // Find the note to be updated and update it
     let note = await Note.findById(req.params.id);
     if(!note){return res.status(404).send("Not Found")}

     //user check krne ke liye
     if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
       }
       note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true} )
       res.json({note}); 
      }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    });
    

//  ROUTE 4: Delete Exixting note: Delete "/api/auth/deletenote"  Login required
    router.delete( // put ham update ke liye use kr rahe hai 
    "/deletenote/:id", fetchuser, async (req, res) => {
    //  const {title,description,tag} = req.body;  // destruction se ham hmari sari chize layenge
      try {
        
      
     // Find the note to be deleted and deleted it
     let note = await Note.findById(req.params.id);
     if(!note){return res.status(404).send("Not Found")}

     //Allow deletion only if user own this note
     if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
       }

       note = await Note.findByIdAndDelete(req.params.id)
       res.json({"Success": "Note Has been deleted", note:note} ); 
      }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }

    });
module.exports = router;

