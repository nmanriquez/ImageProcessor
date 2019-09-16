var mongoose = require('mongoose');
var documentLinkSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name : String,
    methods : Array,
    rel : String,
    href : String,
});
module.exports = mongoose.model('documentLinkModel', documentLinkSchema);