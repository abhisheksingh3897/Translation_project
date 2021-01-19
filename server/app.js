var express = require('express'),
	app = express(),
	translate = require('../translationAPI/googleTranslate'),
	redis = require('redis'),
	translateTemp = require('@k3rn31p4nic/google-translate-api'),
	cacheServer = require('../cacheServer/hashmapServer/hashmapServer.js');

var map= cacheServer.start();
var client = redis.createClient(6379);
client.on('error', (error) => {
	console.error(error);
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	//get API call
	res.render('index');
});

app.post('/translate', function (req, res) {
	var data = req.body.data;
	data = data.trim().toLowerCase();
	var outlang = req.body.lang;
	var inlang = req.body.inlang;
	var output = cacheServer.get(data + outlang, map);
	setTimeout(() => {}, 200);
	if (!(output === undefined)) {
		return res.status(200).send({ data: output, cacheUsed: true });
	} else {
		var set = cacheServer.set;
		translate.translateText(data, inlang, outlang, set, res, map);
	}
});

app.post('/translateAPI', function (req, res) {
	var data = req.body.data;
	data = data.trim();
	var outlang = req.body.lang;
	var inlang = req.body.inlang;
	var output;
	client.get(data + outlang, async (err, output) => {
		if (output) {
			return res.status(200).send({ data: output, cacheUsed: true });
		} else {
			translateTemp(data, { from: inlang, to: outlang })
				.then((result) => {
					output = result.text;
					client.setex(data + outlang, 1440, output);
					return res.status(200).send({ data: output, cacheUsed: false });
				})
				.catch((err) => {
					console.error(err);
				});
		}
	});
});

//listening to the server
var server = app.listen(3000, function () {
	console.log('server is running');
});

// module.exports = server;
module.exports = app;