// Document Link Controller CRUD
var documenLinkModel = mongoose.model("documenLinkModel");

var documenLinkController = {};

documenLinkModel.request = function(req, res) {
    documenLinkModel.findOne({name:req.params.name}, function(err, result){
        if (err) {
            res.end({'error':'Internal Error'});    
        }
        else {
            res.send(result);
        }
    });
}

module.exports = documenLinkController;