import { useEffect, useState } from "react"
import UploadProduct from "./UploadProduct"
import SummaryApi from "../common"
import AdminProductCard from "./AdminProductCard"





const AllProducts = () => {
    const [openUploadProduct,setOpenUploadProduct] = useState(false)

    const [allProduct,setAllProduct]=useState([])

    

    const fetchAllProduct=async()=>{
      try{
        const res=await fetch(SummaryApi.getProducts.url)
        const data=await res.json()

        if(data.success){
          setAllProduct(data)
        }

        if(!data.success){
          console.log(data.message)
        }
      }catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchAllProduct()
    },[])


   
  
  return (
    <div className="mt-[4.4rem] w-full mr-4 mb-4">
        <div className='bg-blue-300 py-2 px-4 flex justify-between items-center fixed w-[95%] md:w-[80%] lg:w-[85%] rounded-l'>
            <h2 className='font-bold text-lg'>محصولات</h2>
            <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>بارگزاری محصول</button>
        </div>
        

         {/**all product */}
         <div className='flex flex-wrap gap-2 py-4 bg-blue-300 rounded-lg min-h-screen overflow-y-scroll mt-[4.5rem]'>
          {
            allProduct?.products?.map((product,index)=>
              <AdminProductCard data={product} key={index} refetch={fetchAllProduct} productId={product?._id}/>
            )
          }
        </div>


         {/* upload product component */}
        {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} refetch={fetchAllProduct}/>
        )
      }
    </div>
  )
}

export default AllProducts