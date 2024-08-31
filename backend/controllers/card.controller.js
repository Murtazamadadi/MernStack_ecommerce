import Card from "../models/card.model.js"
// import Product from "../models/product.model.js"
// import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const AddToCard=async(req,res,next)=>{
    const {productId}=req?.body
    const currentUser=req.user.id


    if(currentUser !== req.user.id){
        return next(errorHandler(400,"please logIn"))
    }

    try{
        const isProductAvalible=await Card.findOne({productId,userId:currentUser})
        if(isProductAvalible){
            return next(errorHandler(402,"محصول قبلا درسبد خرید وجود دارد"))
        }

        const productCard=new Card({
            productId:productId,
            userId:currentUser,
        })

        await productCard.save()

        res.status(200).json({
            success:true,
            productCard,
        })
    }catch(err){
        next(err)
    }
}

// =========================================================== Count Product in card

export const CountProductInCard=async(req,res,next)=>{
    try{
        const userId=req?.user?.id
        const count=await Card.countDocuments({userId:userId})
        
        res.status(200).json({
            data:{
                count:count
            },
            success:true,
        })
    }catch(err){
        next(err)
    }
}
// =========================================================== show Product in Product card

export const showProductToCard=async(req,res,next)=>{
    
    const currentUser=req?.user?.id
    try{
        const AllproductUser=await Card.find({userId:currentUser}).populate("productId")
        
        res.status(200).json({
            success:true,
            AllproductUser
        })
    }catch(err){
        next(err)
    }
}
// =========================================================== increase Quantity

export const IncreaseQuantity = async (req, res, next) => {
    
    try {
        const updateProduct = await Card.findByIdAndUpdate(req.params.productId,{
            $set:{
                quantity:req.body.quantity
            }
        },{new:true})

        if(!updateProduct){
            return next(errorHandler(400,"محصول درخواست شده وجود ندارد"))
        }
      
        res.status(200).json({
            success:true,
            updateProduct
        })
    } catch (err) {
        next(err);  // مدیریت خطا
    }
};


// ======================================================= Delete product from Card

export const DeleteProductFromCard=async(req,res,next)=>{
    try{
        const deleteCard=await Card.findByIdAndDelete(req.params.cardId)

        res.status(200).json({
            success:true,
            message:"کارت موفقانه حذف شد"
        })
    }catch(err){
        next(err)
    }
}