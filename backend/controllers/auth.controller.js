import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const SignUp=async(req,res,next)=>{
    const {username,email,password,profilePic}=req.body

    
    if(username==="" || !email==="" || !password===""){
        return next(errorHandler(400,"تمام فیلد ها الزامی می باشد"))
    }

    try{
        
        const hashPassword=bcryptjs.hashSync(password,10)

        const newUser=new User({
            username,
            email,
            password:hashPassword,
            profile:profilePic
        })
        
        await newUser.save()


        res.status(200).json({
            success:true,
            newUser,
            message:"user registered"
        })
    }catch(err){
        next(err)
    }
}


// =================================================== LogIn controller
export const LogIn=async(req,res,next)=>{
    const {email,password}=req.body

    if(!email || !password || email==="" || password===""){
       return next(errorHandler(400,"تمام فیلدها الزامی است")) 
    }

    try{
        const validUser=await User.findOne({email})
        if(!validUser){
            return next(errorHandler(401,"کاربر پیدانشد"))
        }

        const validPassword=bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(400,"نام کاربری یا رمزعبور پیدا نشد"))
        }

        const token=jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET)

        const {password:pass,...rest}=validUser._doc

        res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest)

    }catch(err){
        next(err)
    }
}

// =========================================================== Log Out api

export const LogOut=async(req,res,next)=>{
    try{
        res.clearCookie("access_token").status(200).json({
            message:"کاربرخارج شد",
            success:true,
        })
    }catch(err){
        next(err)
    }
}