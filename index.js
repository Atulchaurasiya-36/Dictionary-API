import express from 'express'
import dotenv from "dotenv"
import mongoose from 'mongoose';
import adminRouter from "./routes/admin.route.js"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js"

dotenv.config();


const app = express()
app.use(express.json());   
app.use(cookieParser());

let port =process.env.PORT || 4000
let mongo_DB_uri=process.env.MONGO_DB_URI

// database connection
 try{
  mongoose.connect(mongo_DB_uri)
  console.log("database connected successfully")

 }catch(err){
  console.log("error in database connectivity")
 }

 app.use("/api/admin",adminRouter)
 app.use("/api/user",userRouter)


app.listen(port,()=>{
  console.log(`server is running on port no ${port}`)
})