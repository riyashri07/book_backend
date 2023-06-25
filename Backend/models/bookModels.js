const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, require: true },
    author: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },


});


const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;
