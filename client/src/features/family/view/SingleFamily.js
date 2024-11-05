import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllFamiliesQuery, useUpdateFamilyMutation, useUpdateTzFileMutation } from "../familiesApiSlice";
import "./singleFamily.css";
import useAuth from "../../../hooks/useAuth";
import ChangeEmployeeForFamily from "./ChangeEmployeeForFamily";
import { FaCirclePlus } from "react-icons/fa6";
import { MdSend } from "react-icons/md";

const SingleFamily = () => {
    const [updateTzFile] = useUpdateTzFileMutation();
    const { role } = useAuth();
    const navigate = useNavigate();
    const { familyId } = useParams();

    const { data: familiesObj, isError, error, isSuccess, isLoading } = useGetAllFamiliesQuery();
    const [updateFamily, { isSuccess: isUpdateSuccess }] = useUpdateFamilyMutation();

    const [firstName, setFirstName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [tuition, setTuition] = useState("");
    const [add, setAdd] = useState(false);
    const [chi, setChai] = useState([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (isUpdateSuccess) {
            if (role === "משפחה") {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    navigate("/dash");
                }, 3000);
            } else {
                navigate("/dash/families");
            }
        }
    }, [isUpdateSuccess, navigate, role]);

    const family = familiesObj?.data?.find(fam => fam._id === familyId);

    useEffect(() => {
        if (family) {
            setChai(family.child);
        }
    }, [family]);

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>{JSON.stringify(error)}</h1>;
    if (!family) return <h1>No family found</h1>;

    const handleChildChange = (index, field, value) => {
        setChai(prevChai => {
            const newChai = [...prevChai];
            newChai[index] = { ...newChai[index], [field]: value };
            return newChai;
        });
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const objFamily = Object.fromEntries(data.entries());

        const newObjFamily = {
            name: objFamily.familyname,
            id: familyId,
            username: objFamily.username,
            password: objFamily.password,
            address: {
                street: objFamily.street,
                neighborhood: objFamily.neighborhood,
                city: objFamily.city
            },
            employee: objFamily.employee || undefined,
            phone: objFamily.phone,
            email: objFamily.email,
            marital_status: objFamily.marital_status,
            parent1: {
                first_name: objFamily.first_name1,
                tz: objFamily.tz1,
                birth_date: objFamily.birth_date1,
                phone: objFamily.phone1,
                occupation: objFamily.occupation1
            },
            parent2: {
                first_name: objFamily.first_name2,
                tz: objFamily.tz2,
                birth_date: objFamily.birth_date2,
                phone: objFamily.phone2,
                occupation: objFamily.occupation2
            },
            child: chi,
            bank_details: {
                name: objFamily.name,
                bank_number: objFamily.bank_number,
                branch_number: objFamily.branch_number,
                account_number: objFamily.account_number
            },
            approved: family.approved,
            waiting: family.waiting,
            tzFule: family.tzFile
        };
        updateFamily(newObjFamily);
    };

    const formSubmitChild = () => {
        setAdd(false);
        const objChild = {
            first_name: firstName,
            birth_date: birthDate,
            tuition: tuition
        };
        setChai(prevChai => [...prevChai, objChild]);
        setFirstName("");
        setBirthDate("");
        setTuition("");
    };

    const addTzFile = async (file) => {
        await updateTzFile({ id: family._id, tzFile: file });
    };

    if (showSuccessMessage) {
        return (
            <div className="success-fullscreen">
                <div className="success-message">הפרטים נקלטו בהצלחה ויטופלו בהקדם</div>
            </div>
        );
    }

    return (
        <div className="single-family-container">
            <div className="single-family-info">
                {`${family.name} ${family.parent1?.first_name ? family.parent1.first_name : ""} ${family.parent2?.first_name ? family.parent2.first_name : ""}`}
            </div>
            <div className="single-family-form-container">
                <form onSubmit={formSubmit} className="single-family-form">

                    <label name="familyname">
                        <h3>שם משפחה</h3>
                        <input type="text" defaultValue={family.name} required name="familyname" placeholder="שם משפחה" />
                    </label>

                    <label name="username">
                        <h3>שם משתמש</h3>
                        <input type="text" defaultValue={family.username} required name="username" placeholder="שם משתמש" />
                    </label>

                    <label name="password">
                        <h3>סיסמה</h3>
                        <input type="password" defaultValue={family.password} name="password" placeholder="סיסמה" />
                    </label>

                    <label name="parent1">
                        <h3>פרטי הורה 1</h3>
                        <input type="text" defaultValue={family.parent1?.first_name} name="first_name1" placeholder="שם" />
                        <input type="text" defaultValue={family.parent1?.tz} name="tz1" placeholder="ת.ז." />
                        <input type="date" defaultValue={family.parent1?.birth_date} name="birth_date1" placeholder="תאריך לידה" />
                        <input type="text" defaultValue={family.parent1?.phone} name="phone1" placeholder="פלאפון" />
                        <input type="text" defaultValue={family.parent1?.occupation} name="occupation1" placeholder="עיסוק" />
                    </label>

                    <label name="parent2">
                        <h3>פרטי הורה 2</h3>
                        <input type="text" defaultValue={family.parent2?.first_name} name="first_name2" placeholder="שם" />
                        <input type="text" defaultValue={family.parent2?.tz} name="tz2" placeholder="ת.ז." />
                        <input type="date" defaultValue={family.parent2?.birth_date} name="birth_date2" placeholder="תאריך לידה" />
                        <input type="text" defaultValue={family.parent2?.phone} name="phone2" placeholder="פלאפון" />
                        <input type="text" defaultValue={family.parent2?.occupation} name="occupation2" placeholder="עיסוק" />
                    </label>

                    <div className="children-header">
                        <h3>ילדים</h3>
                        <button type="button" className="add-button" onClick={() => setAdd(true)}>
                            <FaCirclePlus size={30} />
                        </button>
                    </div>

                    {add && (
                        <label name="child">
                            <h3>הוספת ילד</h3>
                            <input
                                type="text"
                                value={firstName}
                                placeholder="שם"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="date"
                                value={birthDate}
                                placeholder="תאריך לידה"
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                            <input
                                type="text"
                                value={tuition}
                                placeholder="עלות שכר לימוד"
                                onChange={(e) => setTuition(e.target.value)}
                            />
                            <button type="button" className="add-button submit" onClick={formSubmitChild}>
                                <MdSend />
                            </button>
                        </label>
                    )}

                    {chi?.map((c, index) => (
                        <label key={index} name="child">
                            <input
                                type="text"
                                value={c.first_name}
                                placeholder="שם"
                                onChange={(e) => handleChildChange(index, 'first_name', e.target.value)}
                            />
                            <input
                                type="date"
                                value={c.birth_date}
                                placeholder="תאריך לידה"
                                onChange={(e) => handleChildChange(index, 'birth_date', e.target.value)}
                            />
                            <input
                                type="text"
                                value={c.tuition}
                                placeholder="עלות שכר לימוד"
                                onChange={(e) => handleChildChange(index, 'tuition', e.target.value)}
                            />
                        </label>
                    ))}

                    <label name="address">
                        <h3>כתובת</h3>
                        <input type="text" defaultValue={family.address?.street} name="street" placeholder="רחוב" />
                        <input type="text" defaultValue={family.address?.neighborhood} name="neighborhood" placeholder="שכונה" />
                        <input type="text" defaultValue={family.address?.city} name="city" placeholder="עיר" />
                    </label>

                    <label name="phone">
                        <h3>טלפון</h3>
                        <input type="text" defaultValue={family.phone} name="phone" placeholder="טלפון" />
                    </label>

                    <label name="email">
                        <h3>אימייל</h3>
                        <input type="email" defaultValue={family.email} name="email" placeholder="אימייל" />
                    </label>

                    <label name="marital_status">
                        <h3>מצב משפחתי</h3>
                        <select required name="marital_status">
                            <option value="">מצב משפחתי</option>
                            <option selected={family.marital_status === "נשוי/אה"} value="נשוי/אה">נשוי/אה</option>
                            <option selected={family.marital_status === "רווק/ה"} value="רווק/ה">רווק/ה</option>
                            <option selected={family.marital_status === "גרוש/ה"} value="גרוש/ה">גרוש/ה</option>
                            <option selected={family.marital_status === "פרוד/ה"} value="פרוד/ה">פרוד/ה</option>
                            <option selected={family.marital_status === "אלמן/נה"} value="אלמן/נה">אלמן/נה</option>
                        </select>
                    </label>

                    <label name="bank_details">
                        <h3>פרטי בנק</h3>
                        <input type="text" defaultValue={family.bank_details?.name} required name="name" placeholder="שם בעל החשבון" />
                        <input type="text" defaultValue={family.bank_details?.bank_number} required name="bank_number" placeholder="מספר בנק" />
                        <input type="text" defaultValue={family.bank_details?.branch_number} required name="branch_number" placeholder="מספר סניף" />
                        <input type="text" defaultValue={family.bank_details?.account_number} required name="account_number" placeholder="מספר חשבון" />
                    </label>

                    <label name="tzFile">
                        <h3>צילום ת"ז</h3>
                        <input type="file" name="tzFile" onChange={(e) => { addTzFile(e.target.files[0]) }} />
                    </label>
                    {role === 'מנהל' &&
                        <label name="employee">
                            <h3>נציג</h3>
                            <ChangeEmployeeForFamily family={family} />
                        </label>
                    }                   
                    {role != 'מנהל' &&
                            <input name="employee" defaultValue={family.employee?._id} type="hidden" />
                    }

                    <button className="button" type="submit">שלח</button>
                </form>
            </div>
        </div>
    );
};

export default SingleFamily;
