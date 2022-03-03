var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const fs = require('fs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
var jsonfile = require('jsonfile');    
var file = './favs.json'

// display data from json file (GET/SHOW)
app.get('/main',function(req,res){
    fs.readFile('favs.json', (err, data) => {
        if (err) throw err;
        let twitterData = JSON.parse(data);
        res.send(twitterData)
    });
})

// create new tweet data (CREATE/POST)
app.post('/addTofile', function(req, res) {
    var user_id = req.body.userid;
    var user_name = req.body.username;
    var obj = { id: user_id, text: user_name }

    fs.readFile(file, (err, data) => {
        if (err && err.code === "ENOENT") {
            // But the file might not yet exist.  If so, just write the object and bail
            return fs.writeFile(file, JSON.stringify([obj]), error => console.error(error));
        }
        else if (err) {
            // Some other error
            console.error(err);
        }    
        // 2. Otherwise, get its JSON content
        else {
            try {
                const fileData = JSON.parse(data);
    
                // 3. Append the object you want
                fileData.push(obj);
    
                //4. Write the file back out
                fs.writeFile(file, JSON.stringify(fileData), error => console.error(error))
                res.send(JSON.stringify(obj) + " was added to your json file!");
            } catch(exception) {
                console.error(exception);
            }
        }
    });
}); 

module.exports = app;
