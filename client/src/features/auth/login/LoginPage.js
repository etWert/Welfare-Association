import "./loginPage.css"

import { useLoginMutation } from "../authApiSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [login, { isError, error, isLoading, isSuccess, data }] = useLoginMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            navigate("/dash")
        }
    }, [isSuccess])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const userObj = Object.fromEntries(data.entries())
        login(userObj)
    }

    return (
        <div className="login-page">
            <div className="navigation">
                 <Link to="/login" className="login current">כניסה</Link>
                <Link to="/register" className="register">הרשמה</Link>
            </div>
            <form onSubmit={handleSubmit} className="login-page-form">

                <h1>כניסת משתמשים</h1>
                <input type="text" required name="username" id="username" placeholder="שם משתמש" />
                <input type="password" required name="password" id="password" placeholder="סיסמה" />
                <button type="submit">כניסה</button>
                {error && error.data?.message}
            </form>
        </div>
    )
}

export default LoginPage
