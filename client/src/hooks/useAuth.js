import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { selectToken } from "../features/auth/authSlice"

const useAuth = () => {
    const token = useSelector(selectToken)
    let isAdmin = false
    let isFamily = false
    let isEmployee = false
    if (token) {
        const userDecode = jwtDecode(token)
        // console.log("userDecode", userDecode)
        const { _id, username, role, name } = userDecode
        isAdmin = role === "מנהל"
        isEmployee = role === "נציג"
        isFamily = role === "משפחה"
        return { _id, username, role, name, isAdmin, isEmployee, isFamily }
    }
    return { _id: '', username: '', name: '', role: '', isAdmin, isEmployee, isFamily }
}
export default useAuth