import mongoose from "mongoose";
import jwt from "jsonwebtoken";

let userShema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        contact:{
            type:Number
        },
        password:{
            type:String,
            required:true
        }
    }
);

let generateJwtToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY)
};

let User=mongoose.model("user",userShema);
export {User,generateJwtToken};