import { Link, useSearchParams } from "react-router-dom";
import { useDeleteEmployeeMutation, useGetAllEmployeesQuery } from "../employeesApiSlice";
import "../../employee/list/EmployeesList.css";
import Search from "../../../components/search/Search";
import useAuth from "../../../hooks/useAuth";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";

const AdminssList = () => {
    const { role, _id } = useAuth();

    const { data: employeesObj, isError, error, isLoading, isSuccess } = useGetAllEmployeesQuery();
    const [deleteEmployee, { isSuccess: isDeleteSuccess, isError: isDeleteEror }] = useDeleteEmployeeMutation();
    const deleteClick = (employee) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את המנהל")) {
            deleteEmployee({ id: employee._id });
        }
    };

    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>{JSON.stringify(error)}</h1>;

    const filteredData = !q ? [...employeesObj.data] : employeesObj.data.filter(emp => emp.name.indexOf(q) > -1);

    return (
        <div className="employees-list">
            <div className="employees-list-top">
                <Search placeholder="חיפוש לפי שם מנהל" />
            </div>
            <div className="employees-cards">
                {filteredData?.map(employee => {
                    if (employee.role === 'מנהל' && employee._id !== _id) {
                        return (
                            <div className="employee-card" key={employee._id}>
                                <div className="employee-card-header">
                                    <div className="employee-name">{employee.name}</div>
                                </div>
                                <div className="employee-card-body">
                                    <p>פלאפון: {employee.phone}</p>
                                    <p>אימייל: {employee.email}</p>
                                </div>
                                {role === 'מנהל' && (
                                    <div className="employee-card-footer">
                                        <button onClick={() => { deleteClick(employee) }} className="employee-card-button"><MdDeleteOutline size={27} /></button>
                                        <Link to={`/dash/admins/${employee._id}`} className="employee-card-button"><FaRegPenToSquare size={22} /></Link>
                                    </div>
                                )}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default AdminssList;
