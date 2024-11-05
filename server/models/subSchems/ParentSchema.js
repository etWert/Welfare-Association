const mongoose = require("mongoose")
const ParentSchema = new mongoose.Schema({
    first_name: String,
    tz: {
        type: String,
        length: 9,
    },
    birth_date: Date,
    phone: String,
    //עיסוק
    occupation: String,
}, {
    timestamps: true
})
module.exports = ParentSchema