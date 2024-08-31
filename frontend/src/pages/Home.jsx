import BannerProduct from "../components/BannerProduct"
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import ProductCategoryList from "../components/ProductCategoryList"
import VerticalCardProduct from "../components/VarticalCardProduct"



const Home = () => {
  return (
    <div className="min-h-screen">
      <ProductCategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"بهترین ایرپادها"}/>
      <HorizontalCardProduct category={"watches"} heading={"بهترین ساعت ها"}/>
      <VerticalCardProduct category={"camera"} heading={"بهترین کامره ها"}/>
      <VerticalCardProduct category={"televisions"} heading={"بهترین تلویزیون ها"}/>
      <VerticalCardProduct category={"Mouse"} heading={"بهترین ماوس ها"}/>
      <VerticalCardProduct category={"airpodes"} heading={"بهترین گوشکی ها"}/>
      <VerticalCardProduct category={"mobiles"} heading={"بهترین تلویزیون ها"}/>
      <VerticalCardProduct category={"trimmers"} heading={"بهترین ماشین اصلاخ مو ها"}/>
      <VerticalCardProduct category={"printers"} heading={"بهترین پرنتر ها"}/>
    </div>
  )
}

export default Home