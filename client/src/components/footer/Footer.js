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
                    <a href="https://www.google.com/maps/place/מוסיוף+5,+ירושלים" target="_blank" rel="noopener noreferrer">
                        <FaMapMarkerAlt size={30} title="מוסיוף 5 ירושלים" />
                    </a>
                    <a href="tel:0527154470">
                        <MdCall size={30} title="052-715-4470" />
                    </a>
                    <a href="mailto:4470heny@gmail.com">
                        <SiGmail size={30} title="4470heny@gmail.com" />
                    </a>
                </div>
            </div>
    </div>
}
export default Footer