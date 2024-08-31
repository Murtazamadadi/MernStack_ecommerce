import User from "../../models/user.model.js"
import strip from "../../config/strip.js"

console.log(process.env.STRIP_SECRET_KEY)

export const payment=async(request,response,next)=>{
    try{
        const {cardItem}=request.body

        // console.log(cardItem)
        const user=await User.findOne({_id:request.user.id})

        const params={
            submit_type:"pay",
            mode:"payment",
            payment_method_type:["card"],
            billing_address_collection:"auto",
            shipping_options:[
                {
                    shipping_rate:"shr_1Pt1zn061n7jJLXAvPAmen6p"
                }
            ],
            customer_email:user.email,
            line_items:cardItem.map((item,index)=>{
                return{
                    price_data:{
                        currency:"AFN",
                        product_data:{
                            name:item?.productId?.productName,
                            Images:item?.productId?.producImage,
                            metadata:{
                                productId:item?.productId?._id
                            }
                        },
                        unit_amount:item?.productId?.sellingPrice,
                    },
                    adjustable_quantity:{
                        enable:true,
                        minimum:1
                    },
                    quantity:item?.productId?.quantity,
                }
            }),
            success_url:`${process.env.FRONTENT_URL}/success`,
            cancel_url:`${process.env.FRONTENT_URL}/cancel`
        }

        // console.log(stripe.checkout.sessions)
        const session=await strip.checkout.sessions.create(params)

        response.status(200).json({
            success:true,
            session
        })
    }catch(err){
        next(err)
    }
}