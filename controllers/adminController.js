import adminSchema from "../models/admin.model.js"
import wordSchema from "../models/word.model.js"
import {adminSchemaValidation} from "../validation/admin.validatin.js"
import { wordValidationSchema } from "../validation/words.validation.js";
import {generateTokenAndSaveInCookies} from "../middleware/token.js"
import bcrypt from "bcrypt"


export const signup=async(req,res)=>{
  try{
    const {error}=adminSchemaValidation.validate(req.body)
    if(error){
      console.log(error);
      res.status(400).json({message:"All fields are required for signup",error})
    }
    const{adminName,email,password}=req.body
    const existingOne=await adminSchema.findOne({email})
    if(existingOne){
      return res.status(400).json({message:"admin already registered"})
    }
    const hashPassword=await bcrypt.hash(password,10)
    const admin=new adminSchema ({adminName,email,password:hashPassword});
    admin.save()
     const token=generateTokenAndSaveInCookies(admin._id,res)
     console.log(token)
    return res.status(200).json({message:"admin has registered successfully",token})
  }catch(error){

    return res.status(400).json({message:"getting error in registering user"})
    
  }
}

export const login = async(req, res) => {

  const{email,password}=req.body;
  // find admin by email
   const admin= await adminSchema.findOne({email})
   if(!admin){
    return res.status(400).json({message:"admin does not exist"})
   }

  //  compare password
  const isMatch=await bcrypt.compare(password,admin.password)
  if(!isMatch){
    return res.status(400).json({message:"wrong password"})
  }
     const token=generateTokenAndSaveInCookies(admin._id,res)
     console.log(token)
    return res.status(200).json({message:"admin has logged in  successfully",token})
  
};


export const logout=(req,res)=>{
 try{
  res.clearCookie("jwt",{
    path:"/",
  })
  return res.status(200).json({message:"admin logged out successfully"})

 }catch(err){
  console.log(err)
  return res.status(500).json({message:"Error in logging out"})
 }

}



export const addWords=(req,res)=>{
  
  try{
      const{error}=wordValidationSchema.validate(req.body)
  if(error){
    res.status(400).json({message:"word's definition is incomplete"})
  }

   const { word, meaning, realUsage, synonyms, antonyms } = req.body;

   const newWordSchema=new wordSchema({word,meaning,realUsage,synonyms,antonyms})
   newWordSchema.save();
   return res.status(200).json({message:"word has added successfully in database ",newWordSchema})

  }catch(error){
    res.status(400).json({message:"error in while adding words"})
  }
}


export const deleteWords = async (req, res) => {

  try {
    const id = req.params.id.trim()
    const word = await wordSchema.findById(id);
    if (!word) {
      return res.status(404).json({ message: "Word not found" });
    }
    await wordSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Word has been deleted successfully" });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "Error occurred in word deletion" });
  }
};
