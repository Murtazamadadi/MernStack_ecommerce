import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSideber";
import DashUsers from "../components/DashUsers"
import AllProducts from "../components/AllProducts";
import DashProfile from "../components/DashProfile";

function Dashbaord() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  console.log(tab);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* posts... */}
      {tab === "all-products" && <AllProducts />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* comments  */}
      {/* {tab === "comments" && <DashComments />} */}
      {/* dashboard comp */}
      {/* {tab === "dash" && <DashboardComp />} */}
    </div>
  );
}

export default Dashbaord;
