import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const VerifyToken=async(req,res,next)=>{
    

    try{
        const token=req.cookies.access_token;
    
        // console.log("token",token)
        if(!token){
            return next(errorHandler(400,"شماثبت نام نشده اید توکن ندارید"))
        }
        
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return next(errorHandler(400,"شماثبت نام نشده اید توکن شماوجود ندارد"))
            }
            req.user=user
            // console.log("user",req.user)
            next()
        })
    }catch(err){
        console.log(err)
    }
  
}