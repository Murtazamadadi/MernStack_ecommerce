import express from "express"
import { CreateProduct, DeleteProduct, filterProduct, getCategoryProduct, getProducts, getSingleCategoryProduct, ProductDetails, searchProduct, UpdateProduct } from "../controllers/product.controller.js"
import { VerifyToken } from "../middleWare/verifyToken.js"
// import productCategory from "../../frontend/src/helpers/productCategory.js"


const router=express.Router()


router.post("/create-product",VerifyToken,CreateProduct)
router.get("/get-products",getProducts)
router.put("/update-product/:productId",VerifyToken,UpdateProduct)
router.get("/delete/:Id",VerifyToken,DeleteProduct)
router.get("/product-category",getCategoryProduct)
router.post("/single-category/product",getSingleCategoryProduct)
router.get("/product-details/:productId",ProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProduct)

export default router