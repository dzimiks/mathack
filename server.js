const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const session    = require('express-session')
const routesApi = require('./api/routes/index');

// use angular output folder
app.use(express.static(__dirname + '/client/dist/'));

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the API routes when path starts with /api
app.use('/api', routesApi);

// Send angular page
app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname + '/client/dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(8080, () => {
    console.log("Listening on port 8080...");
})