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
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('users', userSchema);

userSchema.methods.generateJWT = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        // fname: this.fname,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
}