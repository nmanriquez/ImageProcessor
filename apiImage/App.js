// entrypoint
const express = require('express');
const bodyParser= require('body-parser');
const dataAccess= require('./db'); // todo: revisar
// routes
const router = require('./routes/routers');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

// router
app.use('', router); //todo: tengo que cambiar la ruta en router?

app.listen(port, function(){
    console.log('listening on: ' + port);
});
