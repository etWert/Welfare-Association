require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/connectDB")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 1234

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
// app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'app')))

connectDB()

app.use("/api/auth", require("./routes/AuthRoute"))
app.use("/api/family", require("./routes/FamilyRoute"))
app.use("/api/employee", require("./routes/EmployeeRoute"))
app.use("/api/conversation", require("./routes/ConversationRoute"))

// app.get("/", (req, res) => {
//     res.send("home page")
// })

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/app/index.html'))
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})