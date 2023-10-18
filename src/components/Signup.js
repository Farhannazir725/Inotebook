import React, { useState } from 'react'
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credetials,setCredential]= useState({name:"", email:"", password:"", cpassword:""})
  let navigat = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credetials;
    const response = await fetch("http://localhost:4000/api/auth/createuser", {

      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({name, email, password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      // Save the auth token and redirect 
      alert("Your Are Registered Successfully")
      localStorage.setItem('token', json.authtoken);
      // history.input('/')
      navigat("/login");
      props.showAlert("Account Created Successfully","success")

    } else {
      props.showAlert("Invalid Credetials","danger")
    }
  }
  const onChange = (e) => {
    setCredential({ ...credetials, [e.target.name]: e.target.value })

  }
  return (
    <div className='container'>
<h2>Create an Account to use this App</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="taxt" className="form-control" name="name" id="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" id="password" onChange={onChange} className="form-control" minLength={5}required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" name="cpassword" id="cpassword" onChange={onChange} className="form-control" minLength={5}required/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
