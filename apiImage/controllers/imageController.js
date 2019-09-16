// Image Controller CRUD
const ObjectID  = require('mongodb').ObjectID;
const fs        = require("fs");
const helper    = require("./helper.js");
const mongoose  = require("mongoose");
const Image = require('../model/imageModel.js');

var ImageModel      = mongoose.model("image");
var imageController = {};

const ORIGINAL_DIR      = './static/original/';
const PROCESSED_DIR     = './static/processed/';
const BASE_URL          = 'http://localhost:8000/';
const SUPPORTED_FORMATS = ["jpeg", "png", "bmp", "tiff", "gif"];

// CREATE - Submit an image
imageController.create = function(req, res) {
    var sourceImage = req.body.sourceImage;
    var imageFormat = sourceImage.substring(sourceImage.indexOf('/') + 1, sourceImage.indexOf(';base64'));

    if (SUPPORTED_FORMATS.includes(imageFormat) == true) {
        var originalPath = helper.getFileName(req.body.name) + "." + imageFormat;
        
        // save sourceImage into disk
        helper.saveImage(ORIGINAL_DIR + originalPath, sourceImage);

        // save into DB
        var originalImage = new ImageModel({
            username : req.body.username,
            name : req.body.name,
            format : imageFormat,
            path : originalPath,
            type : "submitted"
        });
        originalImage.save(function(err, result){
            if(err) {
                res.send({'error' : 'Internal Error'});
            }
            else {
                var returnedOriginal = {
                    id : result._id,
                    name : result.name,
                    format : result.format,
                    username : result.username
                };
                res.send(returnedOriginal);
            }
        });
    }
    else {
        return next({'error' : 'Format Not Supported'});
    }
}

// RESQUEST - get image wiht transformations
imageController.request = function(req, res) {
    ImageModel.findOne({_id : new ObjectID(req.params.id)}, function(err, item){
        if(err || item == null) {
            res.send({'error' : 'Internal Error'});
        }
        else {
            // image processing
            var newpath = helper.applyAction(item.path, item.format, req.query);
            // store new image on DB
            var newId = new ObjectID();
            var processedImageModel = new ImageModel({
                _id : newId,
                username : item.username,
                name : item.name,
                format : item.format,
                path : newpath,
                type : "processed",
                url : BASE_URL + "image/" + newId + "/user/" + item.username + "/file/" + item.name + "." + item.format
            });
            processedImageModel.save(function(err, result){
                if(err) {
                    res.send({'error' : 'Internal Error'});
                }
                else {
                    var processedImage = {
                        name : result.name,
                        username : result.username,
                        url : result.url
                    }
                    res.send(processedImage);
                }
            });
        }
        //res.send();
    });
}

// REQUEST - get URL of processed image file
imageController.requestURL = function(req, res) {
    ImageModel.findOne({_id : new ObjectID(req.params.imageId), username:req.params.username}, function(err, item){
        if(err) {
            res.end({'error':'Internal Error'});
        }
        else {
            fs.readFile(PROCESSED_DIR + item.path, function(err, content) {
                if (err) {
                    res.end({'error':'Internal Error'});    
                }
                else {
                    //res.writeHead(200, {'Content-Type': "'image/" + item.format + "'"});
                    res.end(content);
                }
            });
        }
    });
}

module.exports = imageController;