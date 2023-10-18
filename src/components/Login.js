import React, { useState } from 'react'
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const [credetials,setCredential]= useState({email:"", password:""})
    // let history = useHistory();
    let navigat = useNavigate();

    

    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
               headers: {
              "Content-Type": "application/json",
        
            },
            body: JSON.stringify({email:credetials.email, password:credetials.password})
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            // Save the auth token and redirect 
            // alert("Your Are Login Successfully")
            localStorage.setItem('token',json.authtoken); 
            props.showAlert(" Login Successfully","success")
            navigat("/");

          }else{
            props.showAlert("Invalid Credetials","danger")
          }
    }
    const onChange = (e)=>{
    setCredential({...credetials, [e.target.name]: e.target.value })

}
  return (
    <div className='container mt-2'>
      <h2>Login to Continue the App</h2>
        <form onSubmit={handleSubmit}>   
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credetials.email} onChange={onChange} name="email" id="email"  />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password"  value={credetials.password} onChange={onChange} className="form-control" id="password" />
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
