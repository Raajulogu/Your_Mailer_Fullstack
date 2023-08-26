import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./db.js";
import { userRouter } from "./Routers/user.js";

//configure env
dotenv.config();

let PORT=process.env.PORT
let app=express();
//middlewares
app.use(express.json());
app.use(cors());
//dbConnection
dbConnection()

//routers

app.use("/api/user",userRouter);

app.listen(PORT,()=>{console.log(`Server is running in localhost:${PORT}`)})