var express = require('express');
var mySQLDAO = require('./mySQLDAO');
var mongoDAO = require('./mongoDAO');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/home.html")
})

//Displays showCountries
app.get('/countries', (req, res) => {
    mySQLDAO.getCountry()
        .then((result) => {
            console.log(result)
            //Renders Array named country populated with geography countries
            res.render('showCountries', { countries: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//Displays showCities
app.get('/cities', (req, res) => {
    mySQLDAO.getCities()
        .then((result) => {
            console.log(result)
            //Renders Array named country populated with geography cities
            res.render('showCities', { cities: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//Displays addCountries
app.get('/addCountries', (req, res) => {
    res.render('addCountries')
})

//addCountries POST Request
app.post("/addCountries", (req, res) => {
    //
    mySQLDAO.addCountry(req.body.ccode, req.body.cname, req.body.cdetails)

        .then((result) => {
            console.log(req.body.ccode)
            res.redirect('/')
        })
        .catch((error) => {
            console.log(req.body.ccode)
            res.send("error")
        })
})

//
app.get('/delete/:country', (req, res) => {
    mySQLDAO.deleteCountry(req.params.country)
        .then((result) => {
            //Sends EJS Code if not in database
            if (result.affectedRows == 0) {
                res.send("<H1>Country " + req.params.country + " doesn't exist</H1>")
            } else {
                //redirects user to home page if no issues
                res.redirect('/')
            }
            res.send(result)
        })
        .catch((error) => {
            //Error Messages
            if (error.code == "ER_ROW_REFERENCED_2") {
                res.send("<h3>" + req.params.country + " doesn't exist</H3>")
            }
            else {
                res.send('<H1>Error Message</H1><br><br><H3>' + req.params.country + ' has cities, it cannot be deleted</H3><a href="/">Home</a>')
            }
        })
})
//
app.get('/edit/:country', (req, res) => {
    mySQLDAO.editCountry(req.params.country, req.body.cname, req.body.cdetails)
        .then((result) => {

            if (result.affectedRows == 0) {
                res.send("<H1>Country " + req.params.country + " doesn't exist</H1>")
            } else {
                res.send("<h1>Country: " + req.params.country + " .</h1>")
            }
            res.send(result)
        })
        .catch((error) => {

            if (error.code == "ER_ROW_REFERENCED_2") {
                res.send("<h3>" + req.params.country + " doesn't exist</H3>")
            }
            else {
                res.send('<H1><a href="\">Home</a>')
            }
        })
    mySQLDAO.getCountry()
        .then((result) => {
            console.log(result)
            res.render('showCountries', { countries: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//Displays allDetails for a City, reading in the City Code to displays that cities details
app.get('/allDetails/:city', (req, res) => {
    mySQLDAO.getCity(req.params.city)
        .then((result) => {
            console.log(result)
            res.render('allDetails', { details: result })
        })
        .catch((error) => {
            res.send(error)
        })
})
//Displays headOfState
app.get('/headsofstate', (req, res) => {
    mongoDAO.getHeadsOfState()
        .then((documents) => {
            console.log(documents)
            //Renders Array named details populated with mongo database
            res.render('headsOfState', { details: documents })
        })
        .catch((error) => {
            res.send(error)
        })
})
//Displays addHeadsOfStats
app.get('/addHeadsOfState', (req, res) => {
    res.render("addHeadsOfState")
})

//Post for addHeadsOfState, passes inputs from ejs into mySQLDAO
app.post('/addHeadsOfState', (req, res) => {
    mongoDAO.addHeadsOfState(req.body._id, req.body.headOfState)
        .then((result) => {
            console.log(result)
            res.redirect('/')
        })
        .catch((error) => {
            res.send("error")
        })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})