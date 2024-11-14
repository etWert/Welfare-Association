const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true,
    },
    read_status: {
        type: Boolean,
        default: false,
    },
    sender:{
        type: String,
        enum:["a","b"],
        require:true,   
    },
}, {
    timestamps: true
})
module.exports = MessageSchema