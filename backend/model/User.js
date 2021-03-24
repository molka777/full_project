const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,

    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    }
})


module.exports = User = mongoose.model('user', userSchema);