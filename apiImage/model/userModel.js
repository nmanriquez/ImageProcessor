var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    name : String,
    email : String,
    // links : { // todo
    //     Object
    // }
});
module.exports = mongoose.model('user', userSchema);