import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";



import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";



import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { Context } from "../context/cardContext";
import { logOutSuccess } from "../redux/user/userSlice";




const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [disPlayMenu,setDisplayMenu]=useState(false)

  
  // ======================================  useNavigate
  const navigate=useNavigate()   
  // ======================================  Reducer
 const dispatch=useDispatch()
  
  // ======================================  context
  const {cardProductCount}=useContext(Context)

  // ====================================== handleLogout
  const handleLogout = async () => {
    try {
      const res = await fetch(SummaryApi.Logout.url, {
        method: SummaryApi.Logout.method,
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        dispatch(logOutSuccess(data))
        navigate("/")
      }

      if (!data.success) {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================================================ HandleSearchOnchange
  const handleSearch = (e) => {
    const { value } = e.target;

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  
  return (
    <header className="h-16 shadow-md bg-blue-200 fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pr-2 bg-white">
          <input
            type="text"
            placeholder="جستجو..."
            className="w-full outline-none"
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-l-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center group">
            {currentUser?._id && (
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setDisplayMenu((prev) => !prev)}
            >
              {currentUser? (
                <img
                  src={currentUser?.profile}
                  className="w-10 h-10 rounded-full"
                  alt={currentUser?.username}
                />
              ) : (
                <FaCircleUser />
              )}
            </div>
            )}
            {currentUser && disPlayMenu && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav className="hidden lg:block">
                    <Link
                      to="/dashboard?tab=profile"                    
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={()=>setDisplayMenu((prev)=>!prev)}
                    >
                      داشبورد
                    </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="relative flex justify-center">
            {
              currentUser?._id && (
                <>
                <Link to="/card">
                  <span>
                    <FaShoppingCart />
                  </span>
                  <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                    <p className="text-sm">{cardProductCount? cardProductCount : 0}</p>
                  </div>
                </Link>
                </>
              )
            }
          </div>
          {currentUser?._id ? (
            <div
              onClick={handleLogout}
              className=" cursor-pointer px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              خروج
            </div>
          ) : (
            <div>
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                ورود
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
