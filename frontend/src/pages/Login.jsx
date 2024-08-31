import { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, SignInStart, SignInSuccess } from "../redux/user/userSlice";




const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const dispatch=useDispatch()
  const {error}=useSelector((state)=>state?.user)
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(SignInStart('واریدکردن نام کاربری و ایمیل الزامی است'));
    }
    try {
      // dispatch(SignInStart())
      setLoading(true)
      const res = await fetch(SummaryApi.logIn.url, {
        method:SummaryApi.logIn.method,
        credentials:"include",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false)
        dispatch(signInFailure(data.message))
      }
      if (res.ok) {
        dispatch(SignInSuccess(data))
        setLoading(false)
        navigate('/');
      }
    } catch (error) {
      setLoading(false)
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4 pt-[5rem] min-h-screen">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={(e)=>handleSubmit(e)}>
            <div className="grid">
              <label>ایمیل</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="ایمیل"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:text-red-600"
              >
                فراموشی رمزعبور؟
              </Link>
            </div>

            <button disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              {loading ? "loading..." : "ورود"}
            </button>
          </form>

          <p className="my-5">
            ساختن حساب کاربری؟
            <Link to={"/signup"} className=" text-red-600 hover:text-red-700">
              ثبت نام
            </Link>
          </p>
        {error && (
          <Error error={error}/>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
