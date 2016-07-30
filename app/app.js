var express = require('express'),
    logger = require('morgan'),
    router = express.Router(),
    http = require('http'),
    path = require('path'),
    app = express(),
    fs = require('fs');

// Setup the app
app.set('port', process.env.PORT || 3000);

// Set the views
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Set public folder
app.use(express.static(path.join(__dirname, '/public')));

// Log the requests
if (!module.parent) app.use(logger('dev'));

// Load the routes
// Help me here

app.use(router);

// Dynamically load routes
var routePath= __dirname + '/routes/';
fs.readdirSync(routePath).forEach(function(file) {
    var route=routePath+file;
    console.log(route);
    require(route)(app);
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
    res.status(404).render('404', { url: req.originalUrl });
});

// Listen
if (!module.parent) {
    app.listen(app.get('port'));
}