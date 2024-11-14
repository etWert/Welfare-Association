const Conversation = require("../models/Conversation")

const getAllConversation = async (req, res) => {
    const conversation = await Conversation.find().lean()
    if (!conversation.length) {
        return res.status(400).json({
            error: true,
            message: "לא קיימות שיחות",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: conversation
    })
}
const addConversation = async (req, res) => {
    const { messages, interlocutor_a_id, interlocutor_a_type, interlocutor_b_id, interlocutor_b_type } = req.body
    if (!interlocutor_a_id || !interlocutor_a_type || !interlocutor_b_id || !interlocutor_b_type) {
        return res.status(400).json({
            error: true,
            message: " חובה להכניס את פרטי המשתתפים בשיחה",
            data: null
        })
    }
    const duplicate = await Conversation.findOne({
        $or: [
            { interlocutor_a_id: interlocutor_a_id, interlocutor_b_id: interlocutor_b_id },
            { interlocutor_a_id: interlocutor_b_id, interlocutor_b_id: interlocutor_a_id }
        ]
    });
    if (duplicate) {
        return res.status(409).json({
            error: true,
            message: "כבר קיימת שיחה בינכם",
            data: null
        })
    }
    const conversation = await Conversation.create({ messages, interlocutor_a_id, interlocutor_a_type, interlocutor_b_id, interlocutor_b_type })
    if (!conversation) {
        return res.status(404).json({
            error: true,
            message: "לא ניתן להתחיל את השיחה",
            data: null
        })
    }
    res.json({
        error: false,
        message: "השיחה התחילה בהצלחה",
        data: conversation
    })
}

const updateConversation = async (req, res) => {
    const { id, messages } = req.body
    if(!id){
        return res.status(400).json({
            error: true,
            message: "id חובה להכניס",
            data: null
        })
    }
    const conversation = await Conversation.findById(id).exec()
    if (!conversation) {
        return res.status(400).json({
            error: true,
            message: "שיחה לא קיימת",
            data: null
        })
    }
    
    conversation.messages = messages ? messages : conversation.messages
    
    const newCoversation = await conversation.save()

    res.json({
        error: false,
        message: "השיחה עודכנה בהצלחה",
        data: newCoversation
    })
}

const deleteConversation = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).res.json({
            error: true,
            message: "id חובה להכניס",
            data: null
        })
    }
    const conversation = await Conversation.findById(id).exec()
    if (!conversation) {
        return res.json({
            error: true,
            message: "שיחה לא קיימת",
            data: null
        })
    }
    const deletedConversation = await conversation.deleteOne()
    res.json({
        error: false,
        message: "השיחה נמחקה בהצלחה",
        data: deletedConversation
    })
}

module.exports = { getAllConversation, addConversation, updateConversation, deleteConversation }
