const express = require('express')
const bodyParser = require('body-parser')
const db = require('nedb')
const path = require('path')
const session = require('express-session')

const app = express()
const port = process.env.port || 3000

const bazaDanych = new db({
    filename: 'static/database/game.db',
    autoload: true
});
app.use(bodyParser.urlencoded({
    extended: false
}))
//parse application/json
app.use(bodyParser.json()) //czytanie JSON 

app.use(express.static(path.join(__dirname, 'static')))
app.use(session({
    secret: 'szyfr',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 50 //sesje zapisują się w cookies (50-dni)
    }
}))

//import routingu
require('./modules/routing')(app, path, __dirname, bazaDanych) //wszystko co przekazujemy do routingu z serwera 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))