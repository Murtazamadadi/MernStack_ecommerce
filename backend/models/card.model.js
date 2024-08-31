import mongoose from "mongoose";

const cardSchema=new mongoose.Schema({
    productId:{
        ref:"product",
        type:String
    },
    quantity:{
        type:Number,
        default:1
    },
    userId:{
        type:String,
    }
},
{timestamps:true}
)

const Card=mongoose.model("card",cardSchema)

export default Card;