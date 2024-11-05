import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowRoles }) => {
    //console.log("allowRoles",allowRoles)
    const { role } = useAuth()
    //console.log("role",role)
    const userAllowed = allowRoles.includes(role)
    return (
        userAllowed ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default RequireAuth
