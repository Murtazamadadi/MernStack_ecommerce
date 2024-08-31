
import { toast } from "react-toastify"
import SummaryApi from "../common"
// import { toast } from 'react-toastify'

const AddToCart =async (e,id) =>{
    e.stopPropagation()
    e.preventDefault()
        const response = await fetch(SummaryApi.AddTocard.url,{
            method : SummaryApi.AddTocard.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                { productId : id }
            )
        })
    
        const responseData = await response.json()
    
        if(responseData.success){
           toast.success("محصول به سبد خرید اضافه شد")
        }
    
        if(!responseData.success){
            toast.error(responseData?.message)
        }
    
    
    
   
    return responseData

}


export default AddToCart