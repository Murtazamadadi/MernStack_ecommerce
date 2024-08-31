import  { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct ';
import { TiDelete } from "react-icons/ti";
import SummaryApi from '../common';

// import SummaryApi from '../common';


// eslint-disable-next-line react/prop-types
const AdminProductCard = ({ data,refetch,productId }) => {
  const [editProduct,setEditProduct] = useState(false)

 

  

  const handleDelete=async(e,productId)=>{
    e.stopPropagation()
    try{
        const res=await fetch(`${SummaryApi.deleteProduct.url}/${productId}`,{
            method:SummaryApi.deleteProduct.method,
            credentials:"include"
        })

        console.log(res)
        if(res.ok){
          refetch()
        }
        if(!res.ok){
            console.log(res.message)
        }
    }catch(err){
        console.log(err)
    }
  }
   

  return (
    <div className=" bg-blue-300 p-4 rounded mb-4">
      <div className="w-40 h-[15rem] bg-blue-200 rounded-lg">
        <div className="relative w-full h-[60%] flex justify-center items-center rounded-md bg-blue-300 pb-3">
          <img
            src={data?.productImage[0]}
            className="w-full h-full object-scale-down mix-blend-multiply hover:scale-105 transition-all"
          />
           <div
              className=" absolute -top-[1.5rem] right-0 ml-1 p-2 bg-red-400 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
              onClick={(e)=>handleDelete(e,data?._id)}
            >
              <TiDelete />
            </div>
        </div>

        <div className=' px-2 mt-2'>
        <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>
          <p className="font-semibold">
            {data?.sellingPrice}
          </p>
        </div>

        <div className='flex'>
            <div
              className="mr-[8rem] left-0  ml-1 p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={()=>setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>
            {/* <div
              className=" z-1 left-[2.4rem] p-2 bg-green-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
              onClick={()=>handleDeleteProduct(productId)}
              // onClick={()=>setDeletProduct(true)}
            >
              <AiOutlineDelete />
            </div> */}
        </div>
      </div>

      {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} refetch={refetch} productId={productId}/>
          )
        }

        {/* {
          deletedProduct && (
            <DeleteProductModel Id={productId} onClose={()=>setDeletProduct(false)} />
          )
        } */}
    </div>
  );
};

export default AdminProductCard;
