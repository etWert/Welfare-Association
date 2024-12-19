import { MdChecklist, MdDensitySmall, MdFamilyRestroom, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { GrStatusGood } from "react-icons/gr";
import "./sidebar.css";
import MenuLink from "./MenuLink";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import { IoPerson } from "react-icons/io5";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { useGetAllFamiliesQuery } from "../../features/family/familiesApiSlice";

const SideBar = () => {
    const { name, role, _id } = useAuth();
    const [logout] = useSendLogoutMutation();
    const navigate = useNavigate();

    const { data: familiesObj, isSuccess, isError, error, isLoading } = useGetAllFamiliesQuery();
    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>{JSON.stringify(error)}</h1>;
    let familyMenuItems


    const employeeMenuItems = [
        {
            title: "ראשי",
            path: "/dash",
            end: true, // התאמה מדויקת לנתיב /dash
            icon: <RxDashboard className="icon" />,
        },
        {
            title: "משפחות",
            path: "/dash/families",
            icon: <MdFamilyRestroom className="icon" />,
        },
        {
            title: "נציגים",
            path: "/dash/employees",
            icon: <IoPerson className="icon" />,
        },
        {
            title: "מנהלים",
            path: "/dash/admins",
            icon: <BsFillPersonVcardFill className="icon" />,
        },
        {
            title: "עדכון פרטים",
            path: role === "נציג" ? `/dash/employees/${_id}` : `/dash/admins/${_id}`,
            icon: <MdChecklist className="icon" />,
        },
        {
            title: "הגדרות",
            path: "/dash/settings",
            icon: <IoMdSettings className="icon" />,
        },
        {
            title: "אודות",
            path: "/dash/about",
            icon: <MdDensitySmall className="icon" />,
        }
    ];

    if (role === 'משפחה') {
        const family = familiesObj?.data?.find(fam => fam._id === _id);
        familyMenuItems = [
            {
                title: "ראשי",
                path: "/dash",
                end: true, // התאמה מדויקת לנתיב /dash
                icon: <RxDashboard className="icon" />,
            },
            {
                title: "עדכון פרטים",
                path: `/dash/families/${_id}`,
                icon: <MdChecklist className="icon" />,
            },
            {
                title: "סטטוס",
                path: `/dash/families/status`,
                icon: <GrStatusGood className="icon" />,
            },
            {
                title: "פרטי נציג",
                path: `/dash/families/employeeDetails`,
                icon: <IoPerson className="icon" />,
            },
            {
                title: "שיחה עם הנציג",
                path: `/dash/conversation/${family.employee ? family.employee?._id : '1'}/${family.employee ? family.employee?.name : '1'}/הנציג שלכם`,
                icon: <HiChatBubbleLeftRight className="icon" />,
            },
            {
                title: "הגדרות",
                path: "/dash/settings",
                icon: <IoMdSettings className="icon" />,
            },
            {
                title: "אודות",
                path: "/dash/about",
                icon: <MdDensitySmall className="icon" />,
            }
        ];
    }
    const menuItems = role === "מנהל" || role === "נציג" ? employeeMenuItems : familyMenuItems;

    const logoutClick = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="side-bar">
            <div className="side-bar-user">
                {role === "מנהל" ? <BsFillPersonVcardFill size={20} /> : role === "נציג" ? <IoPerson size={20} /> : <MdFamilyRestroom size={20} />}
                <span className="side-bar-user-fullname">{name}</span>
                <span className="side-bar-user-role">{role}</span>
            </div>
            <div>
                <ul className="side-bar-menu-list">
                    {menuItems.map(item => (
                        <MenuLink item={item} key={item.title} />
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={logoutClick} className="side-bar-logout">
                    <MdLogout size={20} />
                    יציאה
                </button>
            </div>
        </div>
    );
};

export default SideBar;
