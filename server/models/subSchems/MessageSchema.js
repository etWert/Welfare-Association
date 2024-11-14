const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true,
    },
    read_status: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})
module.exports = MessageSchema