var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    username : String,
    name : String,
    format : String,
    path : String,
    type : String,
    url : String
    // links : { // todo
    //     Object
    // }
});
module.exports = mongoose.model('image', imageSchema);