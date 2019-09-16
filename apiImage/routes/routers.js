
const express         = require('express');
const imageController = require("../controllers/imageController.js");
const userController  = require("../controllers/userController.js");
const fs              = require("fs");
const router          = express.Router();

/* image routes */
router.post('/image', imageController.create);

router.get('/image/:id', imageController.request);

router.get('/image/:imageId/user/:username/file/:filename', imageController.requestURL);

/* user routes */
// Account
router.post('/user', userController.create);

router.get('/user/:id', userController.request);

router.put('/user/:id', userController.update);

router.delete('/user/:id', userController.delete);


// Authentication
router.get('/login', userController.login);

router.get('/logout', userController.logout);

/* temp - sample client */
router.get('/sample', function(req, res){
    fs.readFile("./sampleClient/index.html", function (err, content) {
        if (err) {
            res.end({'error':'Internal Error'});    
        }
        else {
            res.end(content);
        }
    });
});

router.get('/example.js', function(req, res){
    fs.readFile("./sampleClient/example.js", function (err, content) {
        if (err) {
            res.end({'error':'Internal Error'});    
        }
        else {
            res.end(content);
        }
    });
});

module.exports = router;