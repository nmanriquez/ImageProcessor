var mongoose = require("mongoose");
const SERVER = 'example:example@localhost:3000'; // mongodb server
const DATABASE = 'example?authSource=admin'; // mongodb database

class Database {
    constructor() {
      this._connect();
    }
    _connect(){
        var mongoDB = `mongodb://${SERVER}/${DATABASE}`;
        mongoose.connect(mongoDB)
        .then(() => {
        console.log('Database connection successful')
        })
        .catch(err => {
        console.error('Database connection error')
        })
    }
}
module.exports = new Database();