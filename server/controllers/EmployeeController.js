const Employee = require("../models/Employee")
const bcrypt = require("bcrypt")
const Family = require("../models/Family")
const getAllEmployee = async (req, res) => {
    const employee = await Employee.find({}, { password: 0 }).lean()
    if (!employee.length) {
        return res.status(400).json({
            error: true,
            message: "הנציג לא נמצא",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: employee
    })
}
const getEmployeeById = async (req, res) => {
    const { id } = req.params
    const employee = await Employee.findById(id, { password: 0 }).lean()
    if (!employee) {
        return res.status(400).json({
            error: true,
            message: "הנציג לא נמצא",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: employee
    })
}
const addEmployee = async (req, res) => {
    const { name, username, password, phone, email, role } = req.body
    if (!name || !password || !username || (role !== 'נציג' && role !== 'מנהל' && role)) {
        return res.status(400).json({
            error: true,
            message: "שם שם משתמש וסיסמה הם חובה",
            data: null
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    let duplicate = await Employee.findOne({ username }).lean()
    if (!duplicate) {
        duplicate = await Family.findOne({ username }).lean()
    } if (duplicate) {
        return res.status(409).json({
            error: true,
            message: "שם משתמש זה כבר נמצא בשימוש - בחר שם משתמש אחר",
            data: null
        })
    }

    const employee = await Employee.create({ name, username, password: hashPassword, phone, email, role })
    if (!employee) {
        return res.status(404).json({
            error: true,
            message: "הנציג לא נמצא",
            data: null
        })
    }
    res.json({
        error: false,
        message: "The employee was successfully added",
        data: employee
    })
}
const updateEmployee = async (req, res) => {

    const { _id, name, username, password, phone, email, role } = req.body
    if (!_id) return res.status(404).send("ID הוא שדה חובה")

    if (role !== 'נציג' && role !== 'מנהל' && role) {
        return res.status(400).json({
            error: true,
            message: "לא מורשה",
            data: null
        })
    }
    const employee = await Employee.findById(_id).exec()

    if (!employee) {
        return res.status(400).json({
            error: true,
            message: "הנציג לא נמצא",
            data: null
        })
    }
    if (password) {
        const hashPassword = await bcrypt.hash(password, 10)
        employee.password = hashPassword
    }
    if (username) {
        const duplicate = await Employee.findOne({ username }).lean()
        if (duplicate && duplicate.username !== employee.username) {
            return res.status(409).json({
                error: true,
                message: "שם משתמש זה כבר נמצא בשימוש - בחר שם משתמש אחר",
                data: null
            })
        }
    }
    employee.name = name ? name : employee.name
    employee.username = username ? username : employee.username
    employee.phone = phone ? phone : employee.phone
    employee.email = email ? email : employee.email
    employee.role = role ? role : employee.role

    const newEmployee = await employee.save()

    res.json({
        error: false,
        message: "The employee was successfully updeted",
        data: newEmployee
    })
}
const deleteEmployee = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).res.json({
            error: true,
            message: "ID is required",
            data: null
        })
    }
    const employee = await Employee.findById(id).exec()
    if (!employee) {
        return res.json({
            error: true,
            message: "הנציג לא נמצא",
            data: null
        })
    }
    const deletedEmployee = await employee.deleteOne()
    res.json({
        error: false,
        message: "The employee was successfully deleted",
        data: deletedEmployee
    })
}

module.exports = { getAllEmployee, getEmployeeById, addEmployee, updateEmployee, deleteEmployee }