import React, { useState } from 'react';
import "./LoginPage.css";
import { Button, TextField } from '@mui/material';
import * as yup from "yup";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

//Validation Shema
let fieldValidationSchema=yup.object({
  email:yup.string().required("Please enter your Email !"),
  password:yup.string().required("Please enter your Password !")
})
//Login Component
const LoginPage = () => {
  let navigate=useNavigate();
  let [error,setError]=useState("");
  let {handleSubmit,handleChange,values,handleBlur,errors}=useFormik({
    initialValues:{
          email:"",
          password:""
        },
        validationSchema:fieldValidationSchema,
        onSubmit:(user)=>{
          console.log(user)
          handleLogin(user)
        }
  })
  //handle LogIn
  async function handleLogin(user){
    
    let response=await fetch(`https://your-mailer-backend.onrender.com/api/user/login`,{
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
    <div className='container-fluid login-container'>
      <div className='row login-main'>
        <div className='col login-column'>
          <div className='login-box'>
            <h1>Log In</h1>
            <form 
            onSubmit={handleSubmit}
            className='login-form'>
            <TextField
              name='email'
              type='email'
              onBlur={handleBlur}
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
              name="password"
              type='password'
              onBlur={handleBlur}
              value={values.password}
              label="password"
              onChange={handleChange}
            />
            {errors.password ?
              <div style={{color:"crimson"}}>{errors.password}</div>
              :""
            }
            <br/>
            <a href="/reset">forgot password ?</a>
            <br/>
            <div>
            <Button
            variant='contained'
            type="submit"
            >
              Log In
            </Button>
            </div>
            </form>
            <br/>
            <div>
              <p>Don't have an account? <a href="/signup">Sign Up</a></p>
              {error ?<p style={{color:"crimson"}}>
                {error}!
              </p>:""

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
