const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['מנהל', 'נציג'],
        default:'נציג'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Employee', employeeSchema)