const express = require("express")
const EmployeeController = require("../controllers/EmployeeController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()



router.use(verifyJWT)
router.use(verifyAdmin)

router.get("/", EmployeeController.getAllEmployee)
//router.get("/admin", EmployeeController.getAllEmployee)
router.get("/:id", EmployeeController.getEmployeeById)
router.post("/", EmployeeController.addEmployee)
router.put("/", EmployeeController.updateEmployee)
router.delete("/", EmployeeController.deleteEmployee)

module.exports = router