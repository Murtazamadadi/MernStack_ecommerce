import { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
// import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
// import { toast } from "react-toastify";

// import {useSelector} from "react-redux"
import DisplayImage from "./DisplayImage";

// eslint-disable-next-line react/prop-types
const AdminEditProduct = ({ onClose, productData,refetch,productId }) => {

    // console.log(productId)
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
// =================================================================== redux state


  const handleOnChange = (e) => {
    setData({
        ...data,[e.target.id]:e.target.value,
    })
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData({
        ...data,productImage:[...data.productImage,uploadImageCloudinary.url]
    })
  };

  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${SummaryApi.UpdateProduct.url}/${productId}`, {
      method: SummaryApi.UpdateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const Data = await res.json();

    if (Data.success) {
      console.log(Data?.message);
      onClose()
      refetch()
    }

    if (Data.error) {
      console.log(Data?.message);
    }
  };

//   =========================================== handleDeleteImage
  
const handleDeleteImage=async(index)=>{
    console.log(index)
    const newProductImage=[...data.productImage]
    newProductImage.splice(index,1)

    setData({
        ...data,productImage:[...newProductImage],
    })
}

  return (
    <div className="fixed  w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden ">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">بیروزرسانی محصول</h2>
          <div
            className="w-fit mr-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">اسم محصول</label>
          <input
            type="text"
            id="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            اسم برند
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category" className="mt-3">
            دسته بندی
          </label>
          <select
            required
            value={data.category}
            id="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>انتخاب دسته بندی</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            تصویرمحصول
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">آپلود تصویرمحصول</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data?.productImage.map((el, index) => {
                  return (
                    <>
                      <div className="relative group" key={index}>
                        <img
                          src={el}
                          alt={el}
                          width={80}
                          height={80}
                          className="bg-slate-100 border cursor-pointer"
                          onClick={()=>{
                            console.log("ali")
                              setOpenFullScreenImage(true)
                              setFullScreenImageUrl(el)
                          }
                          }
                        />

                        <div
                          className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                          onClick={()=>handleDeleteImage(index)}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                لطفا تصویرمحصول را آپلود کنید
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            قیمت محصول
          </label>
          <input
            type="number"
            id="price"
            placeholder="enter price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            قیمت فروش محصول
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="enter selling price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            توضیحات محصول
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="enter product description"
            rows={3}
            onChange={handleOnChange}
            id="description"
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            آپلودمحصول
          </button>
        </form>
      </div>

      {/***display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImageUrl}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
