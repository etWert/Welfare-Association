const mongoose = require("mongoose")
const ChildSchema = require("./subSchems/ChildSchema")
const ParentSchema = require("./subSchems/ParentSchema")
const RevenuesSchema = require("./subSchems/RevenuesSchema")
const ExpensesSchema = require("./subSchems/ExpensesSchema")
const familySchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    parent1: ParentSchema,
    parent2: ParentSchema,
    child: [ChildSchema],
    address: {
        type: { "street": String, "neighborhood": String, "city": String }
    },
    phone: String,
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    marital_status: {
        type: String,
        enum: ["נשוי/אה", "רווק/ה", "גרוש/ה", "פרוד/ה", "אלמן/נה"],
        // required: true
    },

    bank_details: {
        type: {
            //שם בעל החשבון
            "name": String,
            "bank_number": String,
            "branch_number": String,
            "account_number": String
        },
        // required: true
    },
    tzFile:String,
    //סיבת הפניה
    //cause: String,
    //הכנסות
    /*revenues: [RevenuesSchema],
    //הוצאות משפיעות
    expenses: [ExpensesSchema],
    //הוצאות חריגות שעומדות על הפרק
    הוצאות_חריגות: {
        type: [
            { "פריט": String, "סכום": String, "הערות": String }
        ]
        //האם צריך שדה סה"כ או שיחושב אוטומטית
    },
    //חובות
    debts: {
        type: [
            { "למי החוב": String, "סכום": String, "החזר חודשי": String }
        ]
        //האם צריך שדה סה"כ או שיחושב אוטומטית
    },*/

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    waiting: {
        type: Boolean,
        default: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'משפחה'
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Family', familySchema)
