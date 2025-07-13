import wordSchema from "../models/word.model.js"

export const getWord=async(req,res)=>{
  try{
    const count=wordSchema.countDocuments();
    if(count==0){
      res.status(400).json({message:"no  word found"})
    }
    const random=Math.floor(count*10);
    const word=await wordSchema.findOne().skip(random)
    res.status(200).json({message:"word fetched successfully",word})

  }catch(err){
    console.log(err)
    res.status(400).json({message:"getting error while fetching meaning"})
  }

}

export const getSpecificWord=async(req,res)=>{
  try{
    const{word}=req.params;
    const specificWord=await wordSchema.findOne({word})
    if(!specificWord){
      res.status(400).json({message:"specific word does not exixts"})
    }
    res.status(200).json({message:"specific word fetched successfully",specificWord})

  }catch(err){
    console.log(err)
    res.status(400).json({message:"getting error in fetching specific meaning"})
  }
}