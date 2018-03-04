const mongoose = require('mongoose')

// genre schema
const genreSchema = mongoose.Schema({
    // pass all the fields that you want
    // exclude the id => becuse it's auto generated
    name: {
        type: String,
        required: true //make it required (validation)
    },
    create_date: { //generat date/time when the book submitted
        type: Date,
        default: Date.now //use current time on submit as a default value
    }
})

// export this module to make it acessable to the rest of the app
const Genre = module.exports = mongoose.model('Genre', genreSchema)

// get genres
module.exports.getGenres = (callback, limit) => {
    Genre.find(callback).limit(limit)
}

// add genre
module.exports.addGenre = (genre, callback) => {
    Genre.create(genre, callback) // create() => is a mongo fun
}

// update genre
module.exports.updateGenre = (id, genre, options, callback) => {

    // create query
    let query = {_id: id}
    // specify each field in the db
    // for genre => we only have the name of the genre
    let update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options, callback) // findOneAndUpdate() => is a mongo fun
}

// remove genre
module.exports.removeGenre = (id, callback) => {

    // create query
    let query = {_id: id}

    Genre.remove(query, callback) // remove() => is a mongo fun
}