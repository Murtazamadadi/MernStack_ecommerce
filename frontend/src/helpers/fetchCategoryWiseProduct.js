import SummaryApi from "../common"


const fetchCategoryWiseProduct = async(category)=>{
    const res = await fetch(SummaryApi.getSingleCategoryProduct.url,{
        method : SummaryApi.getSingleCategoryProduct.method,
        credentials:"include",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const resData= await res.json()
    if(!resData.success){
        console.log(resData?.message)
    }

    return resData
}

export default fetchCategoryWiseProduct