import React, { useState } from 'react';
import "./SignUpPage.css";
import { Button, TextField } from '@mui/material';
import * as yup from "yup";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

//Validation Schema
let fieldValidationSchema=yup.object({
  name:yup.string().required("Please enter your Username!"),
  password:yup.string().required("Please enter your Password!"),
  email:yup.string().required("Please enter your Email!"),
  contact:yup.string().required("Please enter your Contact!")
})
//SignUp Component
const SignUpPage = () => {
  let navigate=useNavigate();
  let [error,setError]=useState("");
  
  let {handleSubmit,handleChange,values,errors}=useFormik({
    initialValues:{
      name:"",
      password:"",
      email:"",
      contact:"",
          
      },
        validationSchema:fieldValidationSchema,
        onSubmit:(user)=>{
          console.log(user)
          handleSignUp(user)
        }
  })
  //handle SignUp
  async function handleSignUp(user){
    
    let response=await fetch(`https://your-mailer-backend.onrender.com/api/user/signup`,{
      method:"POST",
      body:JSON.stringify(user),
      headers:{
        "Content-type":"application/json"
      }
    });

    let data =await response.json()
    if(data.token){
      setError("")
      localStorage.setItem("token",data.token)
      navigate("/")
    }
    else{
      setError(data.message)
    }
   
  }

  return (
    <div className='container-fluid sign-container'>
      <div className='row sign-main'>
        <div className='col sign-column'>
          <div className='sign-box'>
            <h1>SignUp</h1>
            <br/>
            <form 
            onSubmit={handleSubmit}
            className='sign-form'>
            <TextField
              name='name'
              type='name'
              value={values.name}
              label="Name"
              onChange={handleChange}
            />
            {errors.name ?
              <div style={{color:"crimson"}}>{errors.name}</div>
              :""
            }
            <br/>
            <TextField
              name='email'
              type='email'
              value={values.email}
              label="Email"
              onChange={handleChange}
            />
            {errors.email ?
              <div style={{color:"crimson"}}>{errors.email}</div>
              :""
            }
            <br/>
            <TextField
              name='contact'
              type='contact'
              value={values.contact}
              label="Contact"
              onChange={handleChange}
            />
            {errors.contact ?
              <div style={{color:"crimson"}}>{errors.contact}</div>
              :""
            }
            <br/>
            <TextField
              name="password"
              type='password'
              value={values.password}
              label="password"
              onChange={handleChange}
            />
            {errors.password ?
              <div style={{color:"crimson"}}>{errors.password}</div>
              :""
            }
            <br/>
            <div>
            <Button
            variant='contained'
            type="submit"
            >
              Sign Up
            </Button>
            </div>
            </form>
            <br/>
            <div>
              <p>Already have an account? <a href="/login">Log In</a></p>
              {error ?<p style={{color:"crimson"}}>
                {error} !
              </p>:""

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
