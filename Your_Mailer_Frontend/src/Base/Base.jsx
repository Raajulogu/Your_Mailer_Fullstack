import React from 'react'
import "./Base.css"
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Base = ({title,children}) => {
    let navigate=useNavigate();
    let token=localStorage.getItem("token");

    function logOut(){
      localStorage.removeItem("token");
      navigate("/")
    }
  return (
    <div className='container-fluid base-main'>
        <div className='row head-main'>
        <div className='col header'>
        <img className='logo'
        src="data:image/jpeg;base64,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"
        alt="Email"
        />
        <span className='btn-box'>
        <Button 
        onClick={()=>navigate("/")}
        className='nav-btn'>
            Home
        </Button>
        <Button 
        onClick={()=>navigate("/send")}
        className='nav-btn'>
        Send
        </Button>
          {token ?
          <Button 
          onClick={()=>logOut()}
          className='nav-btn'>
          Logout
          </Button>:
          <Button 
          onClick={()=>navigate("/login")}
          className='nav-btn'>
          Log In
          </Button>

          }
        </span>
        </div>
        </div>
          <div className='col body-content'>
            {children}
        </div>
    </div>
  )
}

export default Base