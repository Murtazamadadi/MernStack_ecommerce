import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VarticalCard'


const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    console.log("query",query.search)

    const fetchProduct = async()=>{
        try{
            setLoading(true)
            const res = await fetch(SummaryApi.searchProduct.url+query.search)
            const resData = await res.json()
            setLoading(false)
            if(resData.success){
                setData(resData.data)
            }
            if(!resData.success){
                console.log(resData.message)
            }
        }catch(err){
            console.log(err)
        }
      
    }

    useEffect(()=>{
        fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4 pt-[4rem] min-h-screen'>
      {
        loading && (
          <p className='text-lg text-center'>درحال بارگزاری</p>
        )
      }
 
      <p className='text-lg font-semibold my-3'>نتیجه جستجو : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>محصولی پیدا نشد</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
        )
      }

    </div>
  )
}

export default SearchProduct