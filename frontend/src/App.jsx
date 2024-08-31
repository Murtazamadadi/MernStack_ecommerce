import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashbaord from "./pages/Dashbaord"
import CardPage from "./pages/CardPage"
import Search from "./pages/Search"

import "./App.css"
import PrivateRoute from "./components/PrivateRoute"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import { useEffect, useState} from "react"
import SummaryApi from "./common"
import CategoryProduct from "./pages/CategoryProduct"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "./context/cardContext"


function App() {
  const [cardProductCount,setCartProductCount] = useState(0)

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.getCardCount.url,{
      method : SummaryApi.getCardCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    fetchUserAddToCart()

  },[])

  return (
    <BrowserRouter>
    <Context.Provider value={{fetchUserAddToCart,cardProductCount}}>
    <ToastContainer position="top-center"/>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/product-category" element={<CategoryProduct/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashbaord/>}/>
            <Route path="/card" element={<CardPage/>}/>  
          </Route>
          <Route path="/product/:id" element={<ProductDetailsPage/>}/>
        </Routes>
        <Footer/>
        
    </Context.Provider>
    </BrowserRouter>
  )
}

export default App
