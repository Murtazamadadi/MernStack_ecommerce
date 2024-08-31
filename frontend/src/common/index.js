const backendDomin = import.meta.env.VITE_REACT_APP_BACKEND_URL


const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/auth/sign-up`,
        method : "POST"
    },
    logIn:{
        url:`${backendDomin}/api/auth/log-in`,
        method:"POST"
    },
    getUserData:{
        url:`${backendDomin}/api/user/user-details`,
        method:"get"
    },
    Logout:{
        url:`${backendDomin}/api/auth/log-out`,
        method:"get"
    },
    getUsers:{
        url:`${backendDomin}/api/user/get-users`,
        method:"get",
    },
    createProduct:{
        url:`${backendDomin}/api/product/create-product`,
        method:"post"
    },
    getProducts:{
        url:`${backendDomin}/api/product/get-products`,
        method:"get"
    },
    UpdateProduct:{
        url:`${backendDomin}/api/product/update-product`,
        method:"put"
    },
    deleteProduct:{
        url:`${backendDomin}/api/product/delete`,
        method:"get"
    },
    getProductCategory:{
        url:`${backendDomin}/api/product/product-category`,
        method:"get"
    },
    getSingleCategoryProduct:{
        url:`${backendDomin}/api/product/single-category/product`,
        method:"post"
    },
   
    productDetails:{
        url:`${backendDomin}/api/product/product-details`,
        method:"get"
    },
    AddTocard:{
        url:`${backendDomin}/api/card/addtocard`,
        method:"post"
    },
    getCardCount:{
        url:`${backendDomin}/api/card/count`,
        method:"get"
    },
    showProductToCard:{
        url:`${backendDomin}/api/card/show-product-card`,
        method:"get"
    },
    productIncrease:{
        url:`${backendDomin}/api/card/increasQ`,
        method:"put"
    },
    deleteProductCard:{
        url:`${backendDomin}/api/card/delete-card`,
        method:"get"
    },
    searchProduct:{
        url:`${backendDomin}/api/product/search`,
        method:"get"
    },
    filterProduct:{
        url:`${backendDomin}/api/product/filter-product`,
        method:"post"
    },
    payment:{
        url:`${backendDomin}/api/pay/payment`,
        method:"post"
    },
    updateProfile:{
        url:`${backendDomin}/api/user/update-user`,
        method:"post"
    }
}


export default SummaryApi