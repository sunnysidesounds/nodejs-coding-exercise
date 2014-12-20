// Module dependencies
var express = require('express')
    , stylus = require('stylus')
    , nib = require('nib')
    , rawJson = require("./database.json")

var app = express()
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware({ src: __dirname + '/public', compile: compile}))
app.use(express.static(__dirname + '/public'))


// home
app.get('/', function (req, res) {
    if(rawJson.length != 0)
        res.render('index', {
            data: rawJson
        })
    else
        throw new Error("No values in database");
})


// get puppy by name
app.get('/get/:name', function (req, res) {
    if(rawJson.length != 0)
        for (var i=0; i<rawJson.length; i++){
            if(rawJson[i].name == req.param("name"))
                res.render('detail', {
                    name: req.param("name"),
                    data: rawJson[i]
                })
            else
                //TODO: Instead of throwing a error, we should display a message in the UI
                throw new Error(req.param("name") + " doesn't exist in database");
        }
    else
        throw new Error("No values in database");
})

app.listen(3000);