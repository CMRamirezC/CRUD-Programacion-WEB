/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next){
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) =>{
        user.password = hash;
        next();
    });
});

// Export model
const User = mongoose.model('User', UserSchema);
module.exports = User;