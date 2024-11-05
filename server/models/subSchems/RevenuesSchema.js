const mongoose = require("mongoose")
const RevenuesSchema = new mongoose.Schema({
    //בצד הקליינט לכתוב את שמות השדות לפי ההערות כי האנגלית לא מדויקת כמו בטופס
    //אולי כדאי להעביר לתת סכמה נוספת את הסכום ואת המקור כי זה זהה לכל השדות
    husband: {
        "sum": Number,
        "source": String
    },
    wife: {
        "sum": Number,
        "source": String
    },
    //קצבאות ילדים / נכות
    allowances: {
        "sum": Number,
        "source": String
    },
    //הבטחת הכנסה / מזונות
    guarantee: {
        "sum": Number,
        "source": String
    },
    //תמיכה ע"י בני משפחה / אחרים / ארגון צדקה
    support: {
        "sum": Number,
        "source": String
    },
    //הכנסה מנכס /השקעה
    asset: {
        "sum": Number,
        "source": String
    },
    other: {
        "sum": Number,
        "source": String
    },
    //האם צריך שדה סה"כ או שיחושב אוטומטית
    total: Number
}, {
    timestamps: true
})
module.exports = RevenuesSchema