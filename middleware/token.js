import jwt from "jsonwebtoken"
export const generateTokenAndSaveInCookies=async(adminId,res)=>{
  const token=jwt.sign({adminId},process.env.jwt_secret,{
    expiresIn:"10d"
  })
  res.cookie("jwt",token,{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    path:"/"
  })
 return token;
}