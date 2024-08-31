import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SummaryApi from '../common'

const CategoryList = () => {
    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(10).fill(null)

    const fetchCategoryProduct = async() =>{
        try{
            setLoading(true)
            const res = await fetch(SummaryApi.getProductCategory.url)
            const resData= await res.json()
            setLoading(false)
            setCategoryProduct(resData?.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto pt-[5rem]'>
           <div className='flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none'>
            {

                loading ? (
                    categoryLoading.map((el,index)=>{
                            return(
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                </div>
                            )
                    })  
                ) :
                (
                    categoryProduct?.map((product,id)=>{
                        return(
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={id}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-red-500 overflow-hidden p-4 bg-slate-200 flex items-center justify-center' key={id}>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
                )
            }
           </div>
    </div>
  )
}

export default CategoryList