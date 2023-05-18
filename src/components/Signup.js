import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = (props) => {
    const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Account Created SuccessFully","success")
        }
        else {
            props.showAlert("Invalid Details","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='text-white container mt-2'>
            <h2 className='my-3'><b>Create An Account To Use NoteBook</b></h2>
            <form onSubmit={handleSubmit}>
            <div className="my-3">
                <label htmlFor="name" className="form-label"><b>Name</b></label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label"><b>Email address</b></label>
                <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                {/* <div id="emailHelp" className="text-white form-text"><b>We'll never share your email with anyone else.</b></div> */}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label"><b>Password</b></label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label"><b>Confirm Password</b></label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-light"><b>Submit</b></button>
        </form></div>
    )
}

export default SignUp
