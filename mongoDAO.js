const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

//declaring constants to hold Database name and collection name
const dbName = 'headsOfStateDB'
const collName = 'headsOfState';

//declaring variables 
var headsofstateDB
var headsofstate

//Connecting to mongoDB, headsOfStateDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        //Assigns Mongo commands to variables
        headsofstateDB = client.db(dbName)
        headsofstate = headsofstateDB.collection(collName)
    })
    .catch((error) => {
        console.log(error)
    })


var getHeadsOfState = function () {
    //Returns the new Promise
    return new Promise((resolve, reject) => {
        //displays data in collection
        var cursor = headsofstate.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var addHeadsOfState = function (_id,headOfState) {
    return new Promise((resolve, reject) => {
        //Adds new Head of State
        headsofstate.insertOne({"_id":_id,"headOfState":headOfState})
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//Exports Functions to be used in index
module.exports = {getHeadsOfState, addHeadsOfState}