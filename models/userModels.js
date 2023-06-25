// const mongoose = require("mongoose");
// const validator = require("validator");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//     name: { type: String, require: true },
//     email: {
//         type: String,
//         require: true,
//         validate: [validator.isEmail],
//     },
//     password: {
//         type: String,
//         require: true,
//         minLength: [3],
//     }

// });

// userSchema.methods.getjwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//         expiresIn: process.env.JWT_SECRET_KEY_EXPIRE,
//     });
// };

// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

// const UserModel = mongoose.model("user", userSchema);

// module.exports = UserModel;



const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
});
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

