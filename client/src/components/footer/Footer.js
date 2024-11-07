import { MdCall, MdCopyright } from "react-icons/md"
import "./footer.css"
import { FaMapMarkerAlt } from "react-icons/fa"
import { SiGmail } from "react-icons/si"
const Footer = () => {
    return <div className="footer">
                <div className="footer-text"> <MdCopyright />   כל הזכויות שמורות - העני איטי</div>

         <div className="footer-menu">
                {/* <div className="footer-search">
                    <MdSearch />
                    <input type="text" placeholder="search" className="footer-input" />
                </div> */}
                {/* לשנות לפרטים האמיתיים של הקופה */}
                <div className="footer-icons">
                <div className="footer-text"> צור קשר :</div>
                    <a href="https://www.google.com/maps/place/%D7%A7%D7%95%D7%A4%D7%94+%D7%A9%D7%9C+%D7%A6%D7%93%D7%A7%D7%94+-+%D7%A8%D7%9E%D7%AA+%D7%91%D7%99%D7%AA+%D7%A9%D7%9E%D7%A9+%D7%90'%E2%80%AD/@31.7112019,35.0009387,17z/data=!3m1!4b1!4m6!3m5!1s0x1502c39def6cf6f7:0xb9eb2fae3f2f04d0!8m2!3d31.711202!4d34.9960678!16s%2Fg%2F11g6njg3jg?hl=iw&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                        <FaMapMarkerAlt size={30} title="נחל לוז 2" />
                    </a>
                    <a href="tel:029999999">
                        <MdCall size={30} title="029999999" />
                    </a>
                    <a href="mailto:xxxx@gmail.com">
                        <SiGmail size={30} title="xxxx@gmail.com" />
                    </a>
                </div>
            </div>
    </div>
}
export default Footer