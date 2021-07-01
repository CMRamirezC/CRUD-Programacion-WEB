/*jshint esversion: 6 */

const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    User.findOne({ username: username }, (err, user) =>{
        if(user){
            bcrypt.compare(password, user.password, (err, same) =>{
                console.log(user.password);
                if(same){
                    req.session.userId = user._id;
                    res.redirect('/');
                }
                else{
                    res.redirect('/auth/login');
                }
            });
        }
        else{
            res.redirect('/auth/login');
        }
    });
};