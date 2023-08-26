import express from "express";
import { User, generateJwtToken } from "../models/user.js";
import bcrypt from "bcrypt";
import { MailSender } from "../Controllers/mailer.js";
import { isAuthenticated } from "../Controllers/auth.js";



let router = express.Router();

//SignUp
router.post("/signup",async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email});
        //Find is User already exist
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        //generate hashed password
        let salt=await bcrypt.genSalt(10);
        let hashedPassword=await bcrypt.hash(req.body.password,salt);

        //New User Updation
        let newUser=await new User({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            password:hashedPassword
        }).save();
        let token=generateJwtToken(newUser._id);
        res.status(201).json({message:"Signed Up Successfully",token});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
        console.log("Error",error);
    }
})
//LogIn
router.post("/login",async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email});
        //Find user is available
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        //validate password
        let validPassword=await bcrypt.compare(
            req.body.password,
            user.password
            );
        if(!validPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        //generate token
        let token=generateJwtToken(user._id);
        res.status(200).json({message:"Logged In Successfully",token});
    } catch (error) {
        console.log("Error",error)
        res.status(500).json({message:"Internal Server Error"})
    }
})

//Send Mail
router.post("/mail",isAuthenticated,async(req,res)=>{
    try {
        let data=req.body.data;
        let mail=await MailSender(data)
        if(mail){
            res.status(200).json({message:"Mail Sent Successfully"});
        }
        else{
            res.status(500).json({message:"Mail sent Unsuccessfull"})
        }
        
    } catch (error) {
        console.log("Error",error)
        res.status(500).json({message:"Internal Server Error"})
    }
})

//Reset Password
router.put("/reset",async(req,res)=>{
    try {
        //generate hashed password
        let salt=await bcrypt.genSalt(10);
        let hashedPassword=await bcrypt.hash(req.body.password,salt);
        let user=await User.findOneAndUpdate(
            {email:req.body.email},
            {$set:{password:hashedPassword}},
            {new:true}
        );
       
        res.status(201).json({message:"Password Updated Successfully"});
    } catch (error) {
        console.log("Error",error)
        res.status(500).json({message:"Internal Server Error"})
    }
})


export let userRouter=router;