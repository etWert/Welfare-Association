import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddFamilyMutation } from "../familiesApiSlice";
import "./addFamily.css";
import { FaCirclePlus } from "react-icons/fa6";
import { MdSend } from "react-icons/md";

const AddFamily = () => {
    const [addFamily, { data, isError, error, isSuccess, isLoading }] = useAddFamilyMutation();
    const [firstName, setFirstName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [tuition, setTuition] = useState("");
    const [add, setAdd] = useState(false);
    const [chi, setChai] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            navigate("/dash/families");
        }
    }, [isSuccess, navigate]);

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

    const handleChildChange = (index, field, value) => {
        const updatedChildren = chi.map((child, i) => {
            if (i === index) {
                return { ...child, [field]: value };
            }
            return child;
        });
        setChai(updatedChildren);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const objFamily = Object.fromEntries(data.entries());

        const newObjFamily = {
            name: objFamily.name,
            username: objFamily.username,
            password: objFamily.password,
            address: {
                street: objFamily.street,
                neighborhood: objFamily.neighborhood,
                city: objFamily.city
            },
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
                name: objFamily.bank_name,
                bank_number: objFamily.bank_number,
                branch_number: objFamily.branch_number,
                account_number: objFamily.account_number
            },
        };

        addFamily(newObjFamily);
    };
    return (
        <div className="add-family-container">
            <div className="add-family-info">
                <h3>הוספת משפחה חדשה</h3>
            </div>
            <div className="add-family-form-container">
                <form onSubmit={formSubmit} className="add-family-form">

                    <label name="familyname">
                        <h3>שם משפחה</h3>
                        <input type="text" required name="familyname" placeholder="שם משפחה" />
                    </label>

                    <label name="username">
                        <h3>שם משתמש</h3>
                        <input type="text" required name="username" placeholder="שם משתמש" />
                    </label>

                    <label name="password">
                        <h3>סיסמה</h3>
                        <input type="password" name="password" placeholder="סיסמה" />
                    </label>

                    <label name="parent1">
                        <h3>פרטי הורה 1</h3>
                        <input type="text" name="first_name1" placeholder="שם" />
                        <input type="text" name="tz1" placeholder="ת.ז." />
                        <input type="date" name="birth_date1" placeholder="תאריך לידה" />
                        <input type="text" name="phone1" placeholder="פלאפון" />
                        <input type="text" name="occupation1" placeholder="עיסוק" />
                    </label>

                    <label name="parent2">
                        <h3>פרטי הורה 2</h3>
                        <input type="text" name="first_name2" placeholder="שם" />
                        <input type="text" name="tz2" placeholder="ת.ז." />
                        <input type="date" name="birth_date2" placeholder="תאריך לידה" />
                        <input type="text" name="phone2" placeholder="פלאפון" />
                        <input type="text" name="occupation2" placeholder="עיסוק" />
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
                                // value={firstName}
                                placeholder="שם"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="date"
                                // value={birthDate}
                                placeholder="תאריך לידה"
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                            <input
                                type="text"
                                // value={tuition}
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
                                // value={c.first_name}
                                placeholder="שם"
                                onChange={(e) => handleChildChange(index, 'first_name', e.target.value)}
                            />
                            <input
                                type="date"
                                // value={c.birth_date}
                                placeholder="תאריך לידה"
                                onChange={(e) => handleChildChange(index, 'birth_date', e.target.value)}
                            />
                            <input
                                type="text"
                                // value={c.tuition}
                                placeholder="עלות שכר לימוד"
                                onChange={(e) => handleChildChange(index, 'tuition', e.target.value)}
                            />
                        </label>
                    ))}

                    <label name="address">
                        <h3>כתובת</h3>
                        <input type="text" name="street" placeholder="רחוב" />
                        <input type="text" name="neighborhood" placeholder="שכונה" />
                        <input type="text" name="city" placeholder="עיר" />
                    </label>

                    <label name="phone">
                        <h3>טלפון</h3>
                        <input type="text" name="phone" placeholder="טלפון" />
                    </label>

                    <label name="email">
                        <h3>אימייל</h3>
                        <input type="email" name="email" placeholder="אימייל" />
                    </label>

                    <label name="marital_status">
                        <h3>מצב משפחתי</h3>
                        <select required name="marital_status">
                            <option value="">מצב משפחתי</option>
                            <option value="נשוי/אה">נשוי/אה</option>
                            <option value="רווק/ה">רווק/ה</option>
                            <option value="גרוש/ה">גרוש/ה</option>
                            <option value="פרוד/ה">פרוד/ה</option>
                            <option value="אלמן/נה">אלמן/נה</option>
                        </select>
                    </label>

                    <label name="bank_details">
                        <h3>פרטי בנק</h3>
                        <input type="text" required name="name" placeholder="שם בעל החשבון" />
                        <input type="text" required name="bank_number" placeholder="מספר בנק" />
                        <input type="text" required name="branch_number" placeholder="מספר סניף" />
                        <input type="text" required name="account_number" placeholder="מספר חשבון" />
                    </label>

                    <button className="button" type="submit">שלח</button>
                    {error && error.data?.message}

                </form>
            </div>
        </div>
    );
};

export default AddFamily;
