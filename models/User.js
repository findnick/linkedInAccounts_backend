const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('user', userSchema)