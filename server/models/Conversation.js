const mongoose = require("mongoose")
const MessageSchema = require("./subSchems/MessageSchema")

const conversationSchema = new mongoose.Schema({
    messages: [MessageSchema],
    interlocutor_a_id:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
    },
    interlocutor_b_id:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Conversation', conversationSchema)