import mongoose from "mongoose"


const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        requred:true,
    },
    brandName:{
        type:String,
        requred:true,
    },
    category:{
        type:String,
    },
    productImage:[],
    description: {
        type:String,
        requred:true
    },
    price:{
        type:Number,
        requred:true
    },
    sellingPrice: {
        type:Number,
    }

},{
    timestamps:true
}
)


const Product=mongoose.model("product",productSchema)

export default Product