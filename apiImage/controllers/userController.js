// User Controller CRUD
const mongoose  = require("mongoose");
const User      = require('../model/userModel.js');
const userModel = mongoose.model("user");

var userController = {};

userController.create = function(req, res) {
    var newUser = new userModel(req.body);
    newUser.save(function(err, result){ 
        if (err) {
            res.send({'error':'Internal Error'});    
        }
        else {
            res.send(result);
        }
    });
}

userController.request = function(req, res) {
    userModel.findOne({username:req.params.id}, function(err, result){
        if (err || result == null) {
            console.log(err);
            console.log("res:" +result);
            res.send({'error':'Internal Error'});    
        }
        else {
            console.log("request user:" + result);
            res.send(result);
        }
    });
}

userController.delete = function(req, res) {
    userModel.deleteOne({username:req.params.id}, function(err, result){
        if (err) {
            res.send({'error':'Internal Error'});    
        }
        else {
            res.send({'status':'Success'});
        }
    });
}

userController.update = function(req, res) {
    userModel.updateOne({username : req.params.id}, req.body, function(err, result){
        if (err) {
            console.log(err);
            res.send({'error':'Internal Error'});    
        }
        else {
            res.send({'status':'Success'});
        }
    });
}

userController.login = function(req, res) {
    userModel.findOne({username:req.query.username, password:req.query.password}, function(err, result){
        if(err) {
            res.send({'error':'Internal Error'});
        }
        else if (result == null){
                res.send({'error':'Wrong username or password'});
        }
        else {
            res.send(result);
        }
    });
}

userController.logout = function(req, res) {
    // todo: close session
    res.send({'status':'Success'});
}


module.exports = userController;

