const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Family = require("../models/Family");
const Employee = require("../models/Employee");

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({
            error: true,
            message: "חובה למלא את כל השדות",
            data: null
        });
    }
    let foundUser = await Family.findOne({ username: username }).populate("employee", { name: 1 }).lean();
    if (!foundUser) {
        foundUser = await Employee.findOne({ username: username });
    }
    if (!foundUser) {
        return res.status(401).json({
            error: true,
            message: "משתמש לא רשום",
            data: null
        });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        return res.status(401).json({
            error: true,
            message: "משתמש לא רשום",
            data: null
        });
    }

    const userInfo = {
        _id: foundUser._id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role
    };

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
};

const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({
            error: true,
            message: "משתמש לא רשום",
            data: null
        });
    }
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
        if (err) {
            return res.status(403).json({
                error: true,
                message: "נכשל",
                data: null
            });
        }
        let foundUser = await Family.findOne({ username: decode.username }).populate("employee", { name: 1 });
        if (!foundUser) {
            foundUser = await Employee.findOne({ username: decode.username });
        }
        if (!foundUser) {
            return res.status(401).json({
                error: true,
                message: "משתמש לא רשום",
                data: null
            });
        }
        const userInfo = {
            _id: foundUser._id,
            username: foundUser.username,
            name: foundUser.name,
            role: foundUser.role
        };

        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        res.json({ accessToken });
    });
};

const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(204).json({
            error: true,
            message: "אין נתונים",
            data: null
        });
    }
    res.clearCookie("jwt", {
        httpOnly: true
    });
    res.json({
        error: false,
        message: "Cookie נמחק",
        data: null
    });
};

const register = async (req, res) => {
    const { name, username, password} = req.body;
    if (!name || !password || !username ) {
        return res.status(400).json({
            error: true,
            message: "שם שם משתמש וסיסמה הם שדות חובה",
            data: null
        });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    let duplicate = await Family.findOne({ username }).lean();
    if (!duplicate) {
        duplicate = await Employee.findOne({ username }).lean();
    }
    if (duplicate) {
        return res.status(409).json({
            error: true,
            message: "שם משתמש זה כבר נמצא בשימוש - בחר שם משתמש אחר",
            data: null
        });
    }

    const family = await Family.create({ name, username, password: hashPassword });
    if (!family) {
        return res.status(404).json({
            error: true,
            message: "משפחה לא נמצאה",
            data: null
        });
    }
    res.json({
        error: false,
        message: "The family was successfully added",
        data: { username: family.username, _id: family._id }
    });
};

module.exports = { login, refresh, logout, register };
