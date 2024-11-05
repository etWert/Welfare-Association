import { Outlet } from "react-router-dom"
import SideBar from "../../sidebar/SideBar"
import Footer from "../../footer/Footer"
import "./dash-layout.css"
const DashLayout =()=>{
    return <div className="content">
            <SideBar/>
            <Outlet/>
            <Footer/>
        </div>

}
export default DashLayout