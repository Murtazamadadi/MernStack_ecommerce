import express from "express"
import { VerifyToken } from "../middleWare/verifyToken.js"
import { payment } from "../controllers/order/payment.controller.js"


const router=express.Router()


router.post("/payment",VerifyToken,payment)

export default router
