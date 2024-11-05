const Employee = require("../models/Employee")
const Family = require("../models/Family")
const bcrypt = require("bcrypt")

const getAllFamilies = async (req, res) => {
    const family = await Family.find({}, { password: 0 }).populate("employee").lean()

    if (!family.length) {
        return res.status(400).json({
            error: true,
            message: "משפחה לא נמצאה",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: family
    })
}

const getFamilyById = async (req, res) => {
    const { id } = req.params
    const family = await Family.findById(id, { password: 0 }).lean()
    if (!family) {
        return res.status(400).json({
            error: true,
            message: "משפחה לא נמצאה",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: family
    })
}

const addFamily = async (req, res) => {
   
    
    const { employee, name, username, password, address, phone, email, marital_status, bank_details, parent1, parent2, child } = req.body
    if (!name || !password || !username || !marital_status || !bank_details) {
        return res.status(400).json({
            error: true,
            message: "שם, שם משתמש, סיסמה, מצב משפחתי ,ופרטי בנק הם שדות חובה",
            data: null
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    let duplicate = await Family.findOne({ username }).lean()
    if (!duplicate) {
        duplicate = await Employee.findOne({ username }).lean()
    }
    if (duplicate) {
        return res.status(409).json({
            error: true,
            message: "שם משתמש זה כבר נמצא בשימוש - בחר שם משתמש אחר",
            data: null
        })
    }

    const family = await Family.create({ employee, name, username, password: hashPassword, address, phone, email, marital_status, bank_details, parent1, parent2, child })
    if (!family) {
        return res.status(404).json({
            error: true,
            message: "משפחה לא נמצאה",
            data: null
        })
    }
    res.json({
        error: false,
        message: "The family was successfully added",
        data: { username: family.username, _id: family._id }
    })
}

const updateTzFile = async (req, res) => {
    const tzFile = (req.file?.filename ? req.file.filename : "");
    
    const { id } = req.params;

    const family = await Family.findById(id, { password: 0 });
    if (!family) {
        return res.status(400).json({
            error: true,
            message: "משפחה לא נמצאה",
            data: null
        });
    }

    family.tzFile = tzFile;

    const updateFamily = await family.save();

    res.json({
        error: false,
        message: "The family was successfully updated",
        data: { id }
    });
}

const updateFamily = async (req, res) => {
    const { id, employee, name, username, password, address, phone, email, marital_status, bank_details, parent1, parent2, child, waiting, approved } = req.body
    if (!id) {
        return res.status(404).send("ID is required")
    }

    const family = await Family.findById(id).exec()
    if (!family) {
        return res.status(400).json({
            error: true,
            message: "משפחה לא נמצאה",
            data: null
        })
    }
    if (password) {
        const hashPassword = bcrypt.hashSync(password, 10)

        family.password = hashPassword
    }

    if (username) {
        const duplicate = await Family.findOne({ username }).lean()
        if (duplicate && duplicate.username !== family.username) {
            return res.status(409).json({
                error: true,
                message: "שם משתמש זה כבר נמצא בשימוש - בחר שם משתמש אחר",
                data: null
            })
        }
    }

    family.employee = employee
    family.name = name
    family.username = username
    family.address = address
    family.phone = phone
    family.email = email
    family.marital_status = marital_status
    family.bank_details = bank_details
    family.parent1 = parent1
    family.parent2 = parent2
    family.child = child
    family.waiting = waiting
    family.approved = approved

    const updateFamily = await family.save()

    res.json({
        error: false,
        message: "The family was successfully updeted",
        data: { username: updateFamily.username, _id: updateFamily._id }
    })

}

const deleteFamily = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).res.json({
            error: true,
            message: "ID is required",
            data: null
        })
    }
    const family = await Family.findById(id).exec()
    if (!family) {
        return res.status(400).res.json({
            error: true,
            message: "משפחה לא נמצאהה",
            data: null
        })
    }
    //זה מוחק מהמסד ולא עשינו כפתור שמאפשר למחוק
    const deletedFamily = await family.deleteOne()
    res.json({
        error: false,
        message: "The family was successfully deleted",
        data: deletedFamily
    })
   
}

module.exports = { getAllFamilies, getFamilyById, addFamily, updateFamily, deleteFamily, updateTzFile } 