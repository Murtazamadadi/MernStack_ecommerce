
import { MdDelete } from "react-icons/md";

import { useContext, useEffect, useState} from "react"
import SummaryApi from "../common"
import displayINRCurrency from "../helpers/displayCurrency";
import { Context } from "../context/cardContext";
import { toast } from "react-toastify";


const CardPage = () => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const loadingCart = new Array(4).fill(null)

    // fetchUserAddToCart,cardProductCount
    const {fetchUserAddToCart}=useContext(Context)


    const fetchProduct=async()=>{
        try{
            const res=await fetch(SummaryApi.showProductToCard.url,{
                credentials:"include"
            })

            const resData=await res.json()

            if(resData.success){
                setData(resData?.AllproductUser)
                setLoading(false)
            }
            if(!resData.success){
                console.log(resData.message)
                setLoading(false)
            }
        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    const handleLoading = async() =>{
        await fetchProduct()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
         setLoading(false)
    },[])
    // ======================================================= increas Quantity
    const handleIncrement=async(e,id,qty)=>{
        e.stopPropagation()
        try{
            const res=await fetch(`${SummaryApi.productIncrease.url}/${id}`,{
                method:SummaryApi.productIncrease.method,
                credentials:"include",
                headers:{"content-type":"application/json"},
                body: JSON.stringify({
                    quantity:qty+1
                })
            })

            const resData=await res.json()
            if(resData.success){
                fetchProduct()
            }
            if(!resData.success){
                console.log(resData.message)
            }
        }catch(err){
            console.log(err)
        }
    }

    // =============================================== decreament Product
    const handleDecreament=async(e,id,qty)=>{
        e.stopPropagation()
        try{
            const res=await fetch(`${SummaryApi.productIncrease.url}/${id}`,{
                method:SummaryApi.productIncrease.method,
                credentials:"include",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({
                    quantity:qty-1
                })
            })

            const resData=await res.json()
            if(resData.success){
                fetchProduct()
            }
            if(!resData.success){
                console.log(resData.message)
            }
        }catch(err){
            console.log(err)
        }
    }
    // ================================================= delete Card 
    const handleDeletCard=async(e,id)=>{
        e.stopPropagation()
        try{
            const res=await fetch(`${SummaryApi.deleteProductCard.url}/${id}`,{
                credentials:"include"
            })

            const resData=await res.json()

            if(res.ok){
                fetchProduct()
                fetchUserAddToCart()
            }
            if(!resData.success){
                console.log(resData.message)
            }
        }catch(err){
            console.log(err)
        }
    }
    // =================================================  handlePayment
    // const handlePayment=async(e)=>{
    //     e.stopPropagation()
    //     try{
    //         const res=await fetch(SummaryApi.payment.url,{
    //             method:SummaryApi.payment.method,
    //             credentials:"include",
    //             headers:{"content-type":"application/json"},
    //             body:JSON.stringify({
    //                 cardItem:data
    //             })
    //         })

    //         const resData=await res.json()

    //         console.log(resData)
    //         if(resData.success){
    //             console.log(resData)
    //         }
    //         if(!resData.success){
    //             console.log(resData.message)
    //         }
    //     }catch(err){
    //         console.log(err)
    //     }

    // }

    // ================================================= totalPrice and quantity
    
    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
    
    // ================================================= handle Payment
    const handlePayment=(e)=>{
        e.stopPropagation()
        toast.info("قابلیت پرداخت هنوز فعال نیست")
    }
  return (
    <div className='container mx-auto pt-[4rem] min-h-screen'>
        
    <div className='text-center text-lg my-3'>
        {
            data?.length === 0 && !loading && (
                <p className=' bg-blue-200 py-5'>محسولی وجود ندارد</p>
            )
        }
    </div>

    <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4 bg-blue-200 rounded-lg'>   
            {/***view product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart?.map((el,index) => {
                            return(
                                <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                </div>
                            )
                        })
                         
                    ) : (
                      data?.map((product,index)=>{
                       return(
                        <div key={product?._id+"Add To Cart Loading"+index} className='w-full bg-blue-200 h-32 my-2 border-2 border-blue-300 rounded-lg grid grid-cols-[128px,1fr]'>
                            <div className='w-32 h-32 bg-blue-200'>
                                <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                            </div>
                            <div className='px-4 py-2 relative'>
                                {/**delete product */}
                                <div className='absolute left-4 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={(e)=>handleDeletCard(e,product?._id)}>
                                    <MdDelete/>
                                </div>

                                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                <div className='flex items-center justify-between'>
                                        <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                </div>
                                <div className='flex items-center gap-3 mt-1'>
                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={(e)=>handleDecreament(e,product?._id,product?.quantity)}>-</button>
                                    <span>{product?.quantity}</span>
                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={(e)=>handleIncrement(e,product?._id,product?.quantity)}>+</button>
                                </div>
                            </div>    
                        </div>
                       )
                      })
                    )
                }
            </div>


            {/***summary  */}
            {
                data[0] && (
                    <div className='pt-[0.8rem] lg:mt-0 w-full max-w-sm'>
                        
                        {
                                loading ? (
                                <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                    
                                </div>
                                ) : (
                                    <div className='h-36 bg-white'>
                                        <h2 className='text-white bg-red-600 px-4 py-1'>خلاصه اطلاعات خرید</h2>
                                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                            <p>تعدادمحصول</p>
                                            <p>{totalQty}</p>
                                        </div>

                                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                            <p>مبلغ قابل پرداخت</p>
                                            <p>{displayINRCurrency(totalPrice)}</p>    
                                        </div>

                                        <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={(e)=>handlePayment(e)}>پرداخت</button>

                                    </div>
                                )
                            }
                    
                    </div>
                )
            }
    </div>
</div>
)
}

export default CardPage