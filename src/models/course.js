const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    image: String,
    academy: String,
    status: {
        type: Boolean,
        default: false
    },
    created_at: Date
})

module.exports = mongoose.model('courses',CourseSchema)