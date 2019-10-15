const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    academy: String,
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('courses',CourseSchema)