const express = require("express")
const multer = require("multer")

const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "uploads") );
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname); // Corrected line
    }
});

const upload = multer({ storage: storage });
const FamilyController = require("../controllers/FamilyController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()


const Family = require("../models/Family")


router.use(verifyJWT)
//router.use(verifyAdmin)

router.get("/", FamilyController.getAllFamilies)
router.get("/:id", FamilyController.getFamilyById)
router.post("/", verifyAdmin, FamilyController.addFamily)
router.put("/:id", upload.single("tzFile"), FamilyController.updateTzFile)

// router.post("/",verifyAdmin, upload.fields([
//     { name: 'tzFile', maxCount: 1 },

// ]), FamilyController.addFamily);
router.put("/", upload.single('tzFile'), FamilyController.updateFamily)
router.delete("/", verifyAdmin, FamilyController.deleteFamily)

module.exports = router