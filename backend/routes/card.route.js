import express from "express"
import { AddToCard, CountProductInCard, DeleteProductFromCard, IncreaseQuantity, showProductToCard } from "../controllers/card.controller.js"
import { VerifyToken } from "../middleWare/verifyToken.js"



const router=express.Router()



router.post('/addtocard',VerifyToken,AddToCard)
router.get("/count",VerifyToken,CountProductInCard)
router.get("/show-product-card",VerifyToken,showProductToCard)
router.put("/increasQ/:productId",VerifyToken,IncreaseQuantity)
router.get("/delete-card/:cardId",DeleteProductFromCard)



export default router