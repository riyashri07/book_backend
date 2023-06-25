// const app_middleware = require("../middleware/app_middleware");
// const userModel = require("../models/userModels");
// const Token = require("../Token/jwt");
// const bcrypt = require("bcrypt");

// const registerUser = app_middleware(async (req, res, next) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "Please fill the Credentials",
//         });
//     }

//     const hashedPassword = await bcrypt.hash(password, 5);

//     const user = await userModel.create({
//         name,
//         email,
//         password: hashedPassword,
//     });

//     Token(res, 201, user);
// });

// const userLogin = app_middleware(async (req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "Please fill in both Email and Password",
//         });
//     }

//     const userExists = await userModel.findOne({ email });
//     if (!userExists) {
//         return res.status(401).json({
//             success: false,
//             message: "User Not Exists! You have to Sign Up",
//         });
//     }

//     const isPassword = await userExists.comparePassword(password);

//     if (!isPassword) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid Email or Password",
//         });
//     }

//     Token(res, 200, userExists);
// });

// const getAllUsers = app_middleware(async (req, res, next) => {
//     try {
//         res.status(200).json({
//             success: true,
//             message: "sucess route complete",
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error retrieving users",
//         });
//     }
// });

// module.exports = {
//     getAllUsers,
//     registerUser,
//     userLogin,
// };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModels");


require("dotenv").config();

const userRegister = async (req, res) => {
    const payload = req.body;
    const { name, email, password } = payload;
    const isUserPresent = await UserModel.find({ email: email });
    if (isUserPresent.length) {
        return res.send({ msg: "User Already Exist" }); // Add return statement here
    }
    try {
        if (name && email && password) {
            const hashpassword = bcrypt.hashSync(password, 4);
            const newUser = new UserModel({
                ...payload,
                password: hashpassword,
            });
            await newUser.save();
            return res.status(200).send({
                msg: "User has been registered",
                status: "success",
            });
        } else {
            return res.status(400).send({ msg: "Please provide all details" });
        }
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
};

//<-------------------Login User ----------------------->/;

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({
                        msg: "Login Successful",
                        token: jwt.sign({ name: "riya" }, "hang"),
                    });
                } else {
                    res.status(401).send({ msg: "Invalid credentials" });
                }
            });
        } else {
            res.status(404).send({ msg: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};

// -----------------------get all users---------------------------

const userData = async (req, res) => {
    try {
        const allUsers = await UserModel.find();
        res.send({ message: `All Users Data`, data: allUsers });
    } catch (error) {
        res.status(400).send({
            message: `Please Try Again Something Went Wrong!\n , ${error.message}`,
        });
    }
};

module.exports = { userRegister, userLogin, userData };



