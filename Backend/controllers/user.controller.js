const app_middleware = require("../middleware/app_middleware");
const userModel = require("../models/userModels");
const Token = require("../Token/jwt");
const bcrypt = require("bcrypt");

const registerUser = app_middleware(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill the Credentials",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
    });

    Token(res, 201, user);
});

const userLogin = app_middleware(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill in both Email and Password",
        });
    }

    const userExists = await userModel.findOne({ email });
    if (!userExists) {
        return res.status(401).json({
            success: false,
            message: "User Not Exists! You have to Sign Up",
        });
    }

    const isPassword = await userExists.comparePassword(password);

    if (!isPassword) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password",
        });
    }

    Token(res, 200, userExists);
});

const getAllUsers = app_middleware(async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "sucess route complete",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving users",
        });
    }
});

module.exports = {
    getAllUsers,
    registerUser,
    userLogin,
};
