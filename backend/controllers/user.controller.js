import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const getUser=async(req,res,next)=>{

    const userId=req.user.id
    try{
        const userDetails=await User.findById(userId)

        if(!userDetails){
            return next(errorHandler(400,"کاربر پیدا نشد"))
        }

        res.status(200).json({
            success:true,
            userDetails,
        })
    }catch(err){
        next(err)
    }
}

// ======================================= getusers
export const getUsers=async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(400,"شمااجازه ندارید تمام کاربران را بینید"))
    }
    try{
        const users=await User.find()

        res.status(200).json({
            success:true,
            users,
        })
    }catch(err){
        next(err)
    }
}

// ========================================= update User

export const Updateuser=async(req,res,next)=>{
    
    if(req.user.id !==req.params.userId){
        return next(errorHandler(400,"شمااجازه تفییر اطلاعاکاربر ذیل را ندارید"))
    }

    
    try{
        
        const updatedUser=await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profile:req.body.profilePic
            }
        },{new:true})


        res.status(200).json({
            success:true,
            updatedUser
        })
    
    }catch(err){
        console.log(err)
    }
}