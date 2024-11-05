import useAuth from "../../../hooks/useAuth";
import { useGetAllFamiliesQuery } from "../familiesApiSlice";
import { MdAlternateEmail, MdCall } from "react-icons/md";
import './employeeDetails.css';
import { SiGmail } from "react-icons/si";

const EmployeeDetails = () => {
    const { _id } = useAuth();
    const { data: familiesObj, isError, error, isLoading } = useGetAllFamiliesQuery();

    if (isLoading)
        return <h1>Loading...</h1>;
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>;

    const family = familiesObj?.data?.find(fam => fam._id === _id);
    
    if (!family)
        return <h1>No family found</h1>;

    return (
        <div className="employee-details-container">
            <h1 className="employee-details-title">שלום משפחת {family.name}</h1>
            <div className="employee-details-content">
                {family.employee ? <div><p>הנציג שלכם: <strong>{family.employee?.name}</strong></p>
                <p>ילווה אתכם ויתמוך בכם בכל מצב -בזמני שמחה ובזמני קושי.</p>
                <p>אל תהססו לפנות לנציג שלכם בכל שאלה או בקשה. הוא כאן כדי לעזור לכם.</p>

                <h2>פרטי התקשרות:</h2>
                <p>
                    <a href={`mailto:${family.employee?.email}`} className="contact-link">
                        <SiGmail title={family.employee?.email} className="contact-icon" /> מייל: {family.employee?.email}
                    </a>
                </p>
                <p>
                    <a href={`tel:${family.employee?.phone}`} className="contact-link">
                        <MdCall title={family.employee?.phone} className="contact-icon" /> פלאפון: {family.employee?.phone}
                    </a>
                </p></div>:<p>עדיין אין לכם נציג</p>}
            </div>
        </div>
    );
};

export default EmployeeDetails;
