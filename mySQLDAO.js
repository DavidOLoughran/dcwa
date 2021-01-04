var mysql = require('promise-mysql');

var pool

//Connecting to mySQL Database
mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'geography'
})
    .then((result) => {
        pool = result;
    })
    .catch((error) => {
        console.log(error)
    });

var getCountry = function () {
    return new Promise((resolve, reject) => {
        //Reads all data from country table  in geography.sql database
        pool.query('select * from country')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var getCities = function () {
    return new Promise((resolve, reject) => {
        //Reads all data from city table in geography.sql database
        pool.query('select * from city')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var addCountry = function (ccode, cname, cdetails) {
    return new Promise((resolve, reject) => {

        var myQuery = {
            //
            sql: 'insert into country VALUES (?, ?, ?)',
            values: [ccode, cname, cdetails]
        }
        pool.query(myQuery)
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    reject(error)
                })
        })
}

var deleteCountry = function (co_code) {
    return new Promise((resolve, reject) => {
        //deleting country
        var deleteQuery = {
            sql: 'delete from country where co_code = ?',
            values: [co_code]
        }
        pool.query(deleteQuery)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var editCountry = function (co_code, co_name, co_details) {
    return new Promise((resolve, reject) => {
        //deleting country
        var editQuery = {
            sql: 'UPDATE co_name =  from country where co_code = ?',
            values: [co_code, co_name, co_details]
        }
        pool.query(editQuery)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var getCity = function (cty_code) {
    return new Promise((resolve, reject) => {
        pool.query('select * from city where cty_code = "' + cty_code + '"')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { getCountry, getCities, addCountry, deleteCountry, getCity, editCountry }

/*var getState = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from city')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}*/