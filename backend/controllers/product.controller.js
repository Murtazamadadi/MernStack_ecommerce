import Product from "../models/product.model.js"
import { errorHandler } from "../utils/error.js"

export const CreateProduct=async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(400,"فقدآدمین میتواند محصولات را اضافه کند"))
    }
    const { productName,brandName,category,productImage,description,price,sellingPrice}=req.body

    if(productName==="" || brandName==="" || category==="" || productImage==="" || description==="" || price==="" || sellingPrice===""){
        return next(errorHandler(400,"وارید کردن تمام اطلاعات الزامی است"))
    }

    try{
        const newProduct=new Product({
            productName,
            brandName,
            category,
            productImage,
            description,
            price,
            sellingPrice

        })

        await newProduct.save()

        res.status(200).json({
            success:true,
            message:"محصول اضافه شد",
            newProduct
        })
    }catch(err){
        next(err)
    }
}

// ================================================ get Products

export const getProducts=async(req,res,next)=>{
    try{
        const products=await Product.find().sort({createdAt:-1})

        res.status(200).json({
            success:true,
            products,
        })
    }catch(err){
        next(err)
    }
}

// ================================================= Update Products

export const UpdateProduct=async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(400,"شمااجازه اپدید کردن محصول را ندارید"))
    }

    try{
        const updatedProduct=await Product.findByIdAndUpdate(req.params.productId,{
            $set:{
                productName:req.body.productName,
                brandName:req.body.brandName,
                category:req.body.category,
                productImage:req.body.productImage,
                description:req.body.description,
                price:req.body.price,
                sellingPrice:req.body.sellingPrice
            },
        
        },
        {new:true}
    )


    res.status(200).json({
        message:"product updatad successfuly",
        success:true,
        updatedProduct
    })
    }catch(err){
        next(err)
    }
}

// ================================================= Delete Product

export const DeleteProduct=async(req,res,next)=>{

    const productId=req.params.Id

    if(!req.user.isAdmin){
        return next(errorHandler(400,"شمااجازه حذف این محصول را ندارید"))
    }
    try{
        const deletedProduct=await Product.findByIdAndDelete(productId)

        res.status(200).json({
            success:true,
            message:"product deleted successfuly",
        })
    }catch(err){
        next(err)
    }
}

// ===================================================== Product Category

export const getCategoryProduct = async(req,res,next)=>{
    try{
        const productCategory = await Product.distinct("category")

      
        const productByCategory = []

        for(const category of productCategory){
            const product = await Product.findOne({category })

            if(product){
                productByCategory.push(product)
            }
        }


        res.json({
            message : "category product",
            data : productByCategory,
            success : true,
            error : false
        })


    }catch(err){
       next(err)
    }
}

// ===================================================== Product Category

export const getSingleCategoryProduct=async(req,res,next)=>{

    const {category}=req.body || req.quere

    try{
        const product=await Product.find({category})
        res.status(200).json({
            success:true,
            product
        })
    }catch(err){
        next(err)
    }
}

// ===================================================== Product Details
// ===================================================== Product Details

export const ProductDetails=async(req,res,next)=>{
    
    try{
        const details=await Product.findById(req.params.productId)
        
        res.status(200).json({
            success:true,
            details
        })
    }catch(err){
        next(err)
    }
}
// ===================================================== Product search

export const searchProduct = async(req,res,next)=>{
    try{
        const query = req.query.q 

        const regex = new RegExp(query,'i','g')

        const product = await Product.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category : regex
                }
            ]
        })


        res.status(200).json({
            data  : product ,
            message : "Search Product list",
            error : false,
            success : true
        })
    }catch(err){
      next(err)
    }
}

// ============================================= Filter Products


export const filterProduct = async(req,res,next)=>{
    try{
           const categoryList = req?.body?.category || []
   
           const product = await Product.find({
               category :  {
                   "$in" : categoryList
               }
           })
   
           res.status(200).json({
               product,
               message : "product",
               error : false,
               success : true
           })
    }catch(err){
       next(err)
    }
   }
   