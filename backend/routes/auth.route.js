import express from "express"
import { LogIn, LogOut, SignUp } from "../controllers/auth.controller.js"


const router=express.Router()

router.post("/sign-up",SignUp)
router.post("/log-in",LogIn)
router.get("/log-out",LogOut)
export default router