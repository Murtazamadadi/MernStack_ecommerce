import stripe from "stripe"

const strip=new stripe(process.env.STRIP_SECRET_KEY)

console.log(process.env.STRIP_SECRET_KEY)



export default strip