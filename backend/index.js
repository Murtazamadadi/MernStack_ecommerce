import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
import cardRouter from "./routes/card.route.js"
import paymentRouter from "./routes/payment.route.js"

import cookieParser from "cookie-parser"
dotenv.config()

// ============================================== database_connecton
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})

const app=express()
// =============================================== Using core
const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json())
app.use(cookieParser())

// =============================================== api routes
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/card",cardRouter)
app.use("/api/pay",paymentRouter)


// ============================================= MeddleWare for error handling
app.use((err,rea,res,next)=>{
   
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Error";
    res.status(statusCode).json({
        success:false,
        message,
        stack:err.stack,
    })

    if (err.code === 11000) {
        err.message = "رکورد تکراری یافت شد. لطفاً از اطلاعات متفاوت استفاده کنید.";
        err.status = 400;
        next() 
    }
})


app.listen(9900,()=>{
    console.log("server is runing on port 9900")
})