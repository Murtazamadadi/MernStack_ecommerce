import SummaryApi from "../common";

// eslint-disable-next-line react/prop-types
function DeleteProductModel({ onClose,Id }) {
  // =============================================== const deleteProduct
  console.log(Id)
  const handleDeleteProduct=async()=>{
    try{
        const res=await fetch(`${SummaryApi.deleteProduct.url}/${Id}`,{
            method:"delete"
        })

        if(res.ok){
            console.log(res.message)
        }
        if(!res.ok){
            console.log(res.message)
        }
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className="fixed w-full h-full bg-slate-400 bg-opacity-5 z-10 top-0 left-0 flex items-center justify-center">
      <div className=" bg-white p-3 rounded-md">
        <div className="w-[20rem] h-[10rem]">
          <p className=" text-center bg-red-300 p-3">
            آیا میخواهیداین محصول را حذف کنید
        </p>
        </div>
        <div className=" flex gap-7 items-center justify-center">
          <button
            className=" bg-red-300 px-4 py-1 rounded-md cursor-pointer"
            onClick={onClose}
          >
            نخیر
          </button>
          <button
            className=" bg-red-300 px-4 py-1 rounded-md cursor-pointer"
            onClick={() => handleDeleteProduct()}
          >
            بلی, میخواهم
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModel;
