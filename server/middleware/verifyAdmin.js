const verifyAdmin = (req, res, next) => {
    if (req.user &&( req.user.role === "מנהל"||req.user.role === "נציג")) {
        next()
    }
    else {
        return res.status(401).json({
            error: true,
            message: "!!!!!!!!!!!!!!!!1לא מורשה כעובד",
            data: null
        })
    }
}
module.exports = verifyAdmin