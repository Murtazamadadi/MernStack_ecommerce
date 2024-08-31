import { useDispatch, useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { useRef, useState } from "react";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { UpdateFailure, UpdateStart, UpdateSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const [data, setData] = useState({});
  const inputRef = useRef();

  const dispatch=useDispatch()
  const navigate=useNavigate()


  const handleChageImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      setData({
        ...data,
        profilePic: imagePic,
      });
    }
  };

  const handleChageinput = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      dispatch(UpdateStart())
      const res = await fetch(`${SummaryApi.updateProfile.url}/${id}`, {
        method: SummaryApi.updateProfile.method,
        credentials: "include",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(data)
      });

      const resData = await res.json();

     
      if (res.ok) {
        toast.success("کاربرموفقانه بیروزرسانی شد بااطلاعات جدید وارید شوید!")
        dispatch(UpdateSuccess(resData))
        navigate("/login")
      }
      if(!res.ok){
        dispatch(UpdateFailure(resData.message))
      }
    } catch (err) {
      dispatch(UpdateFailure(err.message))
    }
  };

  return (
    <div className="mt-[12rem] w-full h-full flex flex-col items-center">
      <div className=" p-3 flex flex-col items-center">
        <div className=" w-[4rem] h-[4rem] rounded-full text-center">
          <div
            className="w-[4rem] h-[4rem] rounded-full"
            onClick={() => inputRef.current.click()}
          >
            {currentUser? (
              <img
                src={currentUser?.profile || data?.profilePic}
                className="w-full h-full cursor-pointer"
              />
            ) : (
              <FaCircleUser className="w-full h-full" />
            )}
          </div>
        </div>
        <h2>{currentUser?.username}</h2>
      </div>
      <form
        className="mt-2 "
        onSubmit={(e) => handleSubmit(e,currentUser?._id)}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChageImage}
          ref={inputRef}
          hidden
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="usernaem">اسم کاربری</label>
          <input
            type="text"
            placeholder="اسم کاربری"
            id="username"
            className="p-2 rounded-lg outline-none focus-within:to-blue-400"
            defaultValue={currentUser?.username}
            onChange={handleChageinput}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="usernaem">ایمیل</label>
          <input
            type="text"
            placeholder="اسم کاربری"
            id="email"
            className="p-2 rounded-lg outline-none focus-within:to-blue-400"
            defaultValue={currentUser?.email}
            onChange={handleChageinput}
          />
        </div>

        <button className="w-full bg-blue-300 mt-4 py-1 rounded-lg cursor-pointer ">
          پیروزرسانی
        </button>
      </form>
    </div>
  );
}

export default DashProfile;
