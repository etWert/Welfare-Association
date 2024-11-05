import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useGetAllFamiliesQuery } from '../familiesApiSlice';
import { GrReturn } from 'react-icons/gr';
import './familyStatus.css';

const FamilyStatus = () => {
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
        <div className="family-status-container">
            <h1 className="family-status-title">שלום משפחת {family.name}</h1>
            <div className="family-status-details">
                
                {family.waiting ? <p>בקשתכם ממתינה לטיפול מנהל</p> : <p>בקשתכם אינה ממתינה לטיפול</p>}

                {family.approved ? <p>בקשתכם אושרה ע"י המנהל</p> : <p>בקשתכם עדיין לא אושרה ע"י המנהל</p>}

                {!family.marital_status && <p>במערכת מעודכן כי עדיין לא עדכנתם פרטים אישיים <br /> נא הכנסו לעדכון פרטים כדי שנוכל לטפל בבקשתכם</p>}

                {family.employee ? <p>הנציג שלכם הוא {family.employee.name}</p> : <p>עדיין לא קבלתם נציג</p>}

                <p>תאריך עדכון אחרון {new Date(family.updatedAt).toLocaleDateString('he-IL', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}</p>

            </div>

        </div>
    );
};

export default FamilyStatus;
