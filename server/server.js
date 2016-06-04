// call the packages we need
var express    = require('express');
var http 			 = require('http');
var bodyParser = require('body-parser');
var app        = express();
var router     = express.Router();
var morgan     = require('morgan');
var config     = require('./config');
var moment     = require('moment');
var _          =  require('underscore');
var request    =  require('request');

var port     = process.env.PORT || 8080;

// configure app
app.use('/api', router);
app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('slash command call rest api.');
	next();
});

// ROUTES FOR OUR API
// =============================================================================

// testing route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	request({
		uri: "http://api.themoviedb.org/3/movie/popular?api_key=0add3c897eb656a62cd72aebb3d941d5",
		method: "GET"
	}, function(error, response, body) {
		res.json({ message: body});
		//console.log(body);
	});

});

// ----------------------------------------------------
router.route('/slackbot')

	.post(function(req, res) {

            res.json({ status: 200, response:  " Hello World" });
	})
	.get(function(req, res) {

		res.json({ status: 200, response:  " Hello World" });
	});

// ----------------------------------------------------
router.route('/slackbot/:slack_id')

	.get(function(req, res) {
		res.json({ status: 405, response: "" });
	})

	.put(function(req, res) {
		res.json({ status: 405, response: "" });
	})

	.delete(function(req, res) {
		res.json({ status: 405, response: "" });
	});


// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Bot Project is live on port: ' + port);
