const mongoose = require("mongoose")
const MessageSchema = require("./subSchems/MessageSchema")

const conversationSchema = new mongoose.Schema({
    messages: [MessageSchema],
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    sender_type:{
        type: String,
        enum:["Family","Employee"],
        require:true,
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    receiver_type:{
        type: String,
        enum:["Family","Employee"],
        require:true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Employee', conversationSchema)