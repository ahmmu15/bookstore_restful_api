const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// bodyParser midware init
app.use(bodyParser.json())

// require genre model file
Genre = require('./models/genre')

// require book model file
Book = require('./models/book')

//conect to mongoose (db location)
mongoose.connect('mongodb://ahmmu14:123123abc@ds141068.mlab.com:41068/bookstore')
constdb = mongoose.connection

// set routing
app.get('/', (req, res) => {
    res.send('Please use /api/books or /api/genres')
})

// get genres route
app.get('/api/genres', (req, res) => {
    Genre.getGenres((err, genres)=> {
        // if theres an error
        if(err) {
            throw err
        }
        // if no error found => then respond with json data
        res.json(genres)

    })
})

// get books route
app.get('/api/books', (req, res) => {
    Book.getBooks((err, books)=> {
        // if theres an error
        if(err) {
            throw err
        }
        // if no error found => then respond with json data
        res.json(books)

    })
})

// get single book route
app.get('/api/book/:_id', (req, res) => {
    Book.getBookById(req.params._id, (err, book)=> {
        // if theres an error
        if(err) {
            throw err
        }
        // if no error found => then respond with json data
        res.json(book)

    })
})

// add/ post genres route
app.post('/api/genres', (req, res) => { //it doesnt matter if you have the same url => as long as the method is different => post, get .. etc.

    const genre = req.body //use podyParser to get values from url/ form

    Genre.addGenre(genre, (err, genre)=> {
        // if theres an error
        if(err) {
            throw err
        }
        // if no error found => then respond with json data
        res.json(genre)

    })
})

// add/ post book route
app.post('/api/books', (req, res) => { //it doesnt matter if you have the same url => as long as the method is different => post, get .. etc.

    const book = req.body //use podyParser to get values from url/ form

    Book.addBook(book, (err, book)=> {
        // if theres an error
        if(err) {
            throw err
        }
        // if no error found => then respond with json data
        res.json(book)

    })
})

// update genres route
// put method has to take an id
//NOTE: we're using _id => because it's like that in the db
app.put('/api/genres/:_id', (req, res) => { //it doesnt matter if you have the same url => as long as the method is different => post, get .. etc.

    // get the id
    const id = req.params._id

    const genre = req.body //use podyParser to get values from url/ form

    Genre.updateGenre(id, genre, {}, (err, genre)=> { //{} => for options
        // if theres an error
        if(err) {
            throw err
        }
        // if no error found => then respond with json data
        res.json(genre)

    })
})

// update book route
// put method has to take an id
//NOTE: we're using _id => because it's like that in the db
app.put('/api/books/:_id', (req, res) => { //it doesnt matter if you have the same url => as long as the method is different => post, get .. etc.

    // get the id
    const id = req.params._id

    const book = req.body //use podyParser to get values from url/ form

    Book.updateBook(id, book, {}, (err, book)=> { //{} => for options
        // if theres an error
        if(err) {
            throw err
        }
        // if no error found => then respond with json data
        res.json(book)

    })
})

// remove genre route
// put method has to take an id
//NOTE: we're using _id => because it's like that in the db
app.delete('/api/genres/:_id', (req, res) => { //it doesnt matter if you have the same url => as long as the method is different => post, get .. etc.

    // get the id
    const id = req.params._id

    Genre.removeGenre(id, (err, genre)=> { //{} => for options
        // if theres an error
        if(err) {
            throw err
        }
        // if no error found => then respond with json data
        res.json(genre)

    })
})

// remove book route
// put method has to take an id
//NOTE: we're using _id => because it's like that in the db
app.delete('/api/books/:_id', (req, res) => { //it doesnt matter if you have the same url => as long as the method is different => post, get .. etc.

    // get the id
    const id = req.params._id

    Book.removeBook(id, (err, book)=> { //{} => for options
        // if theres an error
        if(err) {
            throw err
        }
        // if no error found => then respond with json data
        res.json(book)

    })
})

// set port
const port = 3000

app.listen(port)
console.log('Running on port 3000')
