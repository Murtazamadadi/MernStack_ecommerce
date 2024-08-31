import mongoose from "mongoose";

const userScema=new mongoose.Schema({
    username:{
        type:String,
        requerd:true
    },
    email:{
        type:String,
        requerd:true,
        unique:true
    },
    password:{
        type:String,
        requerd:true,
    },
    profile:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
}
)



const User=mongoose.model("user",userScema)

export default User