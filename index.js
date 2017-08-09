var express = require("express");
var app = express();
var path = require("path");
var exphbs = require("express-handlebars");
var bodyparser = require("body-parser");
var config = require("config");
var log = require("./modellayer/log");
app.locals.config = config.get('app.restAPIEndpoint.v1ContractPath');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

var hbs = exphbs.create({
    defaultLayout: 'layouts',
    helpers: {},
    partialsDir: ['views/partials/']
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    console.log("");
    //  if (config.has('app.restAPIEndpoint.v1ContractPath')) {
    //         console.log(config.get('app.restAPIEndpoint.v1ContractPath'));
    //         console.log(config.get('app.restAPIEndpoint.v2ContractPath'));
    //     }
    log.logger.error("error");
    log.logger.info("info");
    res.render('home', { layout: 'default', title: 'Home Page' });
});

app.get('/dashboard', function(req, res) {
    res.render('dashboard', { layout: 'default', title: 'Dashboard Page' });
});

// app.get('/userRegistration', function(req, res) {
//     res.render('userRegistration', { layout: 'default', title: 'Sign-up Page' });
// });

var userregistration = require('./controllers/userregistration');
app.use('/auth', userregistration);

app.use(function(req, res, next) {
    res.render('404error', { layout: 'default', title: '404 Page' });
});

process.on('uncaughtException', function(err) {
    log.logger.error(err);
});

var port = 2000;
app.listen(port, function() {
    console.log("Server started at port " + port);
});