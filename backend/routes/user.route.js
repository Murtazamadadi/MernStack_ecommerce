import express from "express"
import { getUser, getUsers, Updateuser } from "../controllers/user.controller.js"
import { VerifyToken } from "../middleWare/verifyToken.js"

const router=express.Router()


router.get("/user-details",VerifyToken,getUser)
router.get("/get-users",VerifyToken,getUsers)
router.post("/update-user/:userId",VerifyToken,Updateuser)


export default router