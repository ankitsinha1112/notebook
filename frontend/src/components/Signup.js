
import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    // const response = await fetch("http://localhost:5000/api/auth/createuser", {
    const response = await fetch("/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken); 
        props.showAlert("Account created Successfully","success");
        history.push("/");
        

    }
    else{
        props.showAlert("Invalid details","danger");
    }
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}



  return <div className='container'>
    <h1 className='p-3'>Sign Up</h1>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' id="name" onChange={onChange} aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' id="Password" onChange={onChange} minLength = {5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword' id="cPassword" onChange={onChange} minLength = {5} required/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>
};

export default Signup;
