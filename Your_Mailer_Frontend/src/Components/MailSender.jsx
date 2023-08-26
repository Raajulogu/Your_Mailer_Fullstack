import React, { useEffect, useState } from 'react'
import "./MailSender.css"
import Base from '../Base/Base'
import Papa from "papaparse";
import { Alert, Button, TextField } from '@mui/material'
import * as yup from "yup";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

//Validation Schema
let fieldValidationSchema=yup.object({
  to:yup.string(),
  subject:yup.string(),
  message:yup.string(),
  cc:yup.string(),
  bcc:yup.string(),
})
// MailSender Component
const MailSender = () => {
  //SnackBar
  const [open, setOpen] =useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  let navigate=useNavigate()
  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }
  },[])
  let [msg,setMsg]=useState("");
  let [delay,setDelay]=useState(0);
    let emails=[];
    let setcc=[];
    let setbcc=[];
    let [data,setData]=useState([]);
    function handleFileUpload(e){
        e.preventDefault();
        let file=e.target.files[0];
      Papa.parse(file,{
            header:true,
            complete:function (results,file){
                setData(results.data);
            },
        });
    }
    //Getting emails from csv file
    if(data.length){
      if(data[0].email){
        for(var i=0;i<data.length;i++){
          if(data[i].email&&data[i].email!==" "){
            emails.push(data[i].email);
          }
      }
      }
      if(data[0].cc){
        for(var j=0;j<data.length;j++){
          if(data[j].cc&&data[j].cc!==" "){
            setcc.push(data[j].cc);
          }
      }
      }
      if(data[0].bcc){
        for(var k=0;k<data.length;k++){
          if(data[k].bcc&&data[k].bcc!==" "){
            setbcc.push(data[k].bcc);
          }
      }
      }
    }

    let {handleSubmit,handleChange,values}=useFormik({
      initialValues:{
        to:"",
        subject:"",
        message:"",
        cc:"",
        bcc:""
            
        },
          validationSchema:fieldValidationSchema,
          onSubmit:(data)=>{
            if(data.to!==""){
              emails=[...emails,...data.to.split(",")];
            }
            if(data.cc!==""){
              setcc=[...setcc,...data.cc.split(",")];
            }
            if(data.bcc!==""){
              setbcc=[...setbcc,...data.bcc.split(",")];
            }
            let val={
              email:emails,
              cc:setcc,
              bcc:setbcc,
              subject:data.subject,
              message:data.message,
              delay:delay
            }
            handleSend(val)
          }
    })
    
//Handle Send Email
    async function handleSend(val){
      let token=localStorage.getItem("token");
      if(emails.length||setcc.length||setbcc.length){
        let response=await fetch(`https://your-mailer-backend.onrender.com/api/user/mail`,{
        method:"POST",
        body:JSON.stringify({data:val}),
        headers:{
          "x-auth":token,
          "Content-type":"application/json"
        }
      });
      handleClick()
  
      let data =await response.json()
      setMsg("")
      }
      else{
        setMsg("Please enter your email address !")
      }
     
    }
  return (
    <Base>
    <div className='mail-container'>
        <div className='mail-box'>
        <form
        onSubmit={handleSubmit}
        className='mail-form'
        >
        <TextField
          name='to'
          type='to'
          value={values.to}
          label="To"
          placeholder='Comma Separated Email'
          onChange={handleChange}
        />
        <p>(or)</p>
        <div className='file-field'>
        <input type='file' accept='.csv' onChange={handleFileUpload}
        /><span>(You can also insert a <b>cc</b> and <b>bcc</b> in the file)</span>
        </div>
        <br/>
        <TextField
          required
          name='subject'
          type='subject'
          value={values.subject}
          label="Subject"
          onChange={handleChange}
        />
        <br/>
        <TextField
          required
          name='message'
          type='message'
          value={values.message}
          label="Message"
          multiline
          rows={4}
          onChange={handleChange}
        />
        <br/>
        <TextField
          name='cc'
          type='cc'
          value={values.cc}
          label="cc"
          placeholder='Comma Separated Email'
          onChange={handleChange}
        />
        <br/>
        <TextField
          name='bcc'
          type='bcc'
          value={values.bcc}
          label="bcc"
          placeholder='Comma Separated Email'
          onChange={handleChange}
        />
          <br/>
        <TextField
        className='delay'
          type='number'
          label="Delay"
          placeholder='in seconds'
          onChange={(e)=>setDelay(e.target.value)}
        />
          <div>
            <Button
            variant='contained'
            type="submit"
            >
              Send
            </Button>
            {msg?
            <p style={{color:"crimson"}}>{msg}</p>
            :""

            }
            <Snackbar open={open} autoHideDuration={4000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" 
            sx={{ width: '100%' }}>
              Mail Sent Successfully!
            </Alert>
          </Snackbar>
          </div>
        </form>
        </div>
    </div>
    </Base>
  )
}

export default MailSender


