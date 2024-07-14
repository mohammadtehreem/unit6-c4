const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name:{type: String, require},
    author:{type: String, require},
    price:{type: Number, require},
    reviews:{type: [String], default:[]
    }
})

const bookModel = mongoose.model('books', bookSchema);

module.exports = bookModel;