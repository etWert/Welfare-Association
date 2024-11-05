const mongoose = require("mongoose")
const RevenuesSchema = new mongoose.Schema({
    //בצד הקליינט לכתוב את שמות השדות לפי ההערות כי האנגלית לא מדויקת כמו בטופס
    //אולי כדאי להעביר לתת סכמה נוספת את הסכום ואת המקור כי זה זהה לכל השדות
    
    //משכנתא / שכר דירה
    apartment: {
        "sum": Number,
        "source": String
    },
    //החזקת רכב
    car: {
        "sum": Number,
        "source": String
    },
    //נסיעות
    travel: {
        "sum": Number,
        "source": String
    },
    //שכר לימוד + שיעורי עזר
    //אולי לעשות אוטומטי לפי טבלת הילדים
    tuition: {
        "sum": Number,
        "source": String
    },
    //הוצאות חריגות קבועות
    expenses: {
        "sum": Number,
        "source": String
    },
    //הוצאות מחיה שוטפות - מזון /קניות
    living: {
        "sum": Number,
        "source": String
    },
    //נותני שירות
    //(גז,מים,ארנונה,חשמל,תקשורת)
    services: {
        "sum": Number,
        "source": String
    },
    //האם צריך שדה סה"כ או שיחושב אוטומטית
    total:Number
}, {
    timestamps: true
})
module.exports = RevenuesSchema