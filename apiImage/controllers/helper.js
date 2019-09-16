// helper functions
const Jimp = require('jimp');
const fs = require("fs");

const ORIGINAL_DIR = './static/original/';
const PROCESSED_DIR = './static/processed/';

helper = {};

helper.getFileName = function(name){
    var now = new Date();
    var filename = name + now.getFullYear() + now.getMonth() + now.getDate();
    filename = filename + now.getHours() + now.getMinutes() + now.getSeconds(); 
    return name + '_' + Date.now();
}

helper.getTimestamp = function() {
    return Date.now();
}

// save submitted image
helper.saveImage = function(path, source) {
    var image = source.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(image, 'base64');
    fs.writeFile(path, buf);
}

// Transformation service - pipeline using Jimp library
helper.applyAction = function(oldPath, format, query) {
    var newPath = "processed_" + helper.getTimestamp() + "." + format;
    Jimp.read(ORIGINAL_DIR + oldPath, function(err, image){
        if (err) throw err;
        for(qvalue in query){
            var action = qvalue;
            var value = query[qvalue];
            switch(action){
                case("resize"):
                    image.resize(Number(value[0]), Number(value[1]));
                    break;
                case("thumbnail"):
                    image.scaleToFit(250, 250);
                    break;
                case("flip"):
                    if(value == "vertical") {
                        image.flip(false, true);
                    }
                    else if (value == "horizontal"){
                        image.flip(true, false);
                    }
                    else throw err;
                    break;
                case("rotate"):
                    var degrees = Number(value[0]);
                    if (value[1] == "right"){ // note: issue with library
                        degrees = degrees * -1;
                    }
                    image.rotate(degrees);
                    break;
                case("grayscale"):
                    image.grayscale();
                    break;
                default:
                    throw err;
            }
        }
        // store new image on disk
        image.write(PROCESSED_DIR + newPath);
    });
    return newPath;
}

// for HATEOAS
helper.getLinks = function(req, methodreq, resource){
    var links;
    switch(req){
        case("/"):
            links = {
                links : [{
                        methods : ["GET"],
                        rel : "self",
                        href : "/login"
                    },
                    {
                        methods : ["POST"],
                        rel : "self",
                        href : "/user"
                    }
                ]
            }
            break;
        case("/login"):
            links = {
                links : [{
                        methods : [ "POST"],
                        rel : "self",
                        href : "/image"
                    }
                ]
            }
            break;
        case("/image"):
            links = {
                links : [{
                        methods : ["GET"],
                        rel : "self",
                        href : "/image"
                    }
                ]
            }
            break;
        case("/image/:id"):
            links = {
                links : [{
                        methods : ["GET"],
                        rel : "self",
                        href : "/image/:id/user/:username/file/myimage.png"
                    }
                ]
            }
            break;
    }
    return links;
}


module.exports = helper;