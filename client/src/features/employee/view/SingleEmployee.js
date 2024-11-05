import { useGetAllEmployeesQuery, useUpdateEmployeeMutation } from "../employeesApiSlice"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"

import "./singleEmployee.css"
import useAuth from "../../../hooks/useAuth";

const SingleEmployee = () => {

    const navigate = useNavigate()
    const { employeeId } = useParams()
    const { data: employeesObj, isError, error, isSuccess, isLoading } = useGetAllEmployeesQuery()
    const [updateEmployee, { isSuccess: isUpdateSuccess }] = useUpdateEmployeeMutation()
    
    const { role } = useAuth();

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (isUpdateSuccess) {
            if (role === "נציג") {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    navigate("/dash");
                }, 3000);
            } else {
                navigate("/dash/employees");
            }
        }
    }, [isUpdateSuccess, navigate, role]);

    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>

    const employee = employeesObj.data.find(emp => emp._id === employeeId)

    if (!employee)
        return <h1>no found</h1>

    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const objEmployee = Object.fromEntries(data.entries())
        updateEmployee(objEmployee)
    }

    if (showSuccessMessage) {
        return (
            <div className="success-fullscreen">
                <div className="success-message">הפרטים נקלטו בהצלחה ויטופלו בהקדם</div>
            </div>
        );
    }

    return (
        <div className="single-employee-container">
            <div className="single-employee-info">
                {employee.name}
            </div>
            <div className="single-employee-form-container">
                <form onSubmit={formSubmit} className="single-employee-form">
                    <input name="_id" defaultValue={employee._id} type="hidden" />
                    <label>שם עובד</label>
                    <input defaultValue={employee.name} type="text" name="name" placeholder="הכנס שם עובד"></input>
                    <label>שם משתמש</label>
                    <input defaultValue={employee.username} type="text" name="username" placeholder="הכנס שם משתמש"></input>
                    <label>סיסמה</label>
                    <input defaultValue={employee.password} type="password" name="password" placeholder="הכנס סיסמה"></input>
                    <label>פלאפון</label>
                    <input defaultValue={employee.phone} type="text" name="phone" placeholder="הכנס פלאפון"></input>
                    <label>אימייל</label>
                    <input defaultValue={employee.email} type="email" name="email" placeholder="הכנס אימייל"></input>
                    <button>עדכון</button>
                </form>
            </div>
        </div>
    )
}

export default SingleEmployee