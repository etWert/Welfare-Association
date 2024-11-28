
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useAddConversationMutation, useGetAllConversationQuery, useUpdateConversationMutation } from "./conversationApiSlice";
import { TbMessageCirclePlus } from "react-icons/tb";
import { useState } from "react";
import "./conversation.css"

const Conversation = () => {
    const { _id: user1Id } = useAuth();
    const { user2Id } = useParams();

    const { data: conversationObj, isError, error, isLoading, isSuccess: getIsSuccess, refetch } = useGetAllConversationQuery();
    const [addConversation, { data, isSuccess: addIsSuccess }] = useAddConversationMutation();
    const [updateConversation, { isSuccess: isUpdateSuccess }] = useUpdateConversationMutation();

    // חיפוש השיחה הרלוונטית
    const conversation = conversationObj?.data?.find(
        (con) =>
            (con.interlocutor_a_id === user1Id || con.interlocutor_a_id === user2Id) &&
            (con.interlocutor_b_id === user1Id || con.interlocutor_b_id === user2Id)
    );

    // זיהוי המשתמש כשולח
    const user1 = conversation ? (user1Id === conversation.interlocutor_a_id ? "a" : "b") : null;
    console.log(conversation);

    //הוספת הודעה
    const [newMessage, setNewMessage] = useState({ content: "", sender: user1 });

    // טיפול במצבים של טעינה ושגיאה
    if (isLoading) return <h1>Loading...</h1>;
    // if (isError) return <h1>{JSON.stringify(error)}</h1>;

    const addNewConversation = async () => {
        try {
            const newConv = await addConversation({
                interlocutor_a_id: user1Id,
                interlocutor_b_id: user2Id,
            })
            if (newConv.data) {
                alert("השיחה נוצרה בהצלחה!");
            }
            refetch(); // רענון הנתונים מהשרת
        } catch (error) {
            console.error("Error creating conversation:", error);
        }
    };

    // פונקציה לטיפול בשליחת הודעה חדשה
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.content) {
            try {
                const newMes = await updateConversation({
                    id: conversation._id,
                    messages: [...conversation.messages, newMessage],
                })
                setNewMessage({ content: "", sender: user1 }); // איפוס ההודעה
                refetch(); // רענון הנתונים
            } catch (error) {
                console.error("Error updating conversation:", error);
            }
        }
    };

    return (
        <div className="chat-container">
            {conversation ? (
                <div>
                    <h2>שיחה עם...</h2>
                    {conversation.messages?.map((m, index) => (
                        <div
                            key={index}
                            className={`message-wrapper ${m.sender === user1 ? "left" : "right"}`}
                        >
                            <div className={`message ${m.sender === user1 ? "left" : "right"}`}>
                                {m.content}
                            </div>
                            <p className="time">
                                {new Date(m.createdAt).toLocaleDateString('he-IL', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}, {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    ))}


                    <form onSubmit={handleSubmit} className="chat-input-container">
                        <input
                            type="text"
                            placeholder="הכנס הודעה"
                            value={newMessage.content}
                            onChange={(e) => setNewMessage({ content: e.target.value, sender: user1 })}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            ) : (
                <div>
                    <p>עדיין לא קיימת שיחה בינכם, לחץ ליצירת שיחה חדשה</p>
                    <button onClick={addNewConversation}>
                        <TbMessageCirclePlus />
                    </button>
                </div>
            )}
        </div>

    );
};

export default Conversation;