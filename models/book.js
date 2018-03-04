const mongoose = require('mongoose')

// book schema
const bookSchema = mongoose.Schema({
    // pass all the fields that you want
    // exclude the id => becuse it's auto generated
    title: {
        type: String,
        required: true //make it required (validation)
    },
    create_date: { //generat date/time when the book submitted
        type: Date,
        default: Date.now //use current time on submit as a default value
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    pages: {
        type: String
    },
    image_url: {
        type: String
    },
    buy_url: {
        type: String
    },
})

// export this module to make it acessable to the rest of the app
const Book = module.exports = mongoose.model('Book', bookSchema)

// get books
module.exports.getBooks = (callback, limit) => {
    Book.find(callback).limit(limit) //find => is a mongo fun
}

// get single book
module.exports.getBookById = (id, callback) => {
    Book.findById(id, callback) //findById => is a mongo fun
}

// add book
module.exports.addBook = (book, callback) => {
    Book.create(book, callback) // create() => is a mongo fun
}

// update book
module.exports.updateBook = (id, book, options, callback) => {

    // create query
    let query = {_id: id}
    // specify each field in the db
    let update = {
        title: book.title,
        genre: book.genre,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        img_url: book.img_url,
        buy_url: book.buy_url        
        
    }
    Book.findOneAndUpdate(query, update, options, callback) // findOneAndUpdate() => is a mongo fun
}

// remove book
module.exports.removeBook = (id, callback) => {

    // create query
    let query = {_id: id}

    Book.remove(query, callback) // remove() => is a mongo fun
}