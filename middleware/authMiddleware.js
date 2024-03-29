/*jshint esversion: 6 */

const User = require('../models/user');

module.exports = (req, res, next) =>{
    User.findById(req.session.userId, (err, user) =>{
        if(err || !user){
            return res.redirect('/');
        }
        next();
    });
}