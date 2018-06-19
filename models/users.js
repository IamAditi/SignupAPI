const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    dp: {
        type: String
    }
});

module.exports = mongoose.model('users', userSchema);