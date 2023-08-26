import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export let isAuthenticated=async(req, res, next)=>{
    if(req.headers){
        try{
            let token=await req.headers["x-auth"];
            let decoded=jwt.verify(token, process.env.SECRET_KEY);
            req.user=await User.findById(decoded.id).select("_id name email");
            next();
        }catch(error){
            console.log("Error",error)
            res.status(401).json({message:"Invalid Authorization"});
        }
    }
    else{
        res.status(401).json({message:"Access Denied"});
    }
    
}