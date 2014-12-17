/*
 * Module dependencies
 */
var express = require('express')
    , stylus = require('stylus')
    , nib = require('nib')
    , JsonDB = require('node-json-db')


var rawJson = require("./database.json")




var app = express()
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
    { src: __dirname + '/public'
        , compile: compile
    }
))
app.use(express.static(__dirname + '/public'))



// home
app.get('/', function (req, res) {
    res.render('index', {
        data: rawJson
    })
})

// get all puppies
app.get('/get/all', function (req, res) {
    res.json(rawJson)
})

// get puppy by name
app.get('/get/:name', function (req, res) {

    //console.log(req.param("name"));


    res.render('detail', {
        name: req.param("name")
    })
})


app.listen(3000);