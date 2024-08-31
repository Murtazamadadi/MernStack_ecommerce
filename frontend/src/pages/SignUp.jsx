import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import { useState } from "react";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import Error from "../components/Error"


import { toast } from "react-toastify";

const initialState={
  username:"",
  email:"",
  password:"",
  profilePic:""
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const [formData, setFormData] = useState(initialState);
  // =============================================== redux state

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({
      ...formData,[e.target.id]:e.target.value,
    })
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setFormData({
      ...formData,profilePic:imagePic
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === "") {
      toast.error("وارید کردن اطلاعات الزامی است");
    }
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        credentials:"include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json()
      if (data.success) {
        setLoading(false)
        setError(null)
        navigate("/login");
      }

      if (!data.success) {
        setError(data.message)
        setLoading(false)
        setFormData(initialState)
      }
    } catch (err) {
      setError(err.message)
      setFormData(initialState)
      return
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4 pt-[6rem] min-h-screen">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={formData.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  تصویر
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>اسم</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="اسم شما"
                  id="username"
                  value={formData.username}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>ایمیل</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="ایمیل"
                  id="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>رمزعبور</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="رمزعبور"
                  value={formData.password}
                  id="password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <button disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              {loading ? (
                <Spinner aria-label="Default status example" />
              ) : (
                "ثبت نام"
              )}
            </button>
          </form>

          <p className="my-5">
            شما حساب کاربری دارید؟{" "}
            <Link to={"/login"} className=" text-red-600 hover:text-red-700">
              ورود
            </Link>
          </p>
        {
          error && (
          <Error error={error}/>
          )
        }
        </div>
      </div>
    </section>
  );
};

export default SignUp;
