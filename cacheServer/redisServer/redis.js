var redis = require('redis');

function start() {
	var client = redis.createClient(6379);
	client.on('error', (error) => {
		console.error(error);
	});
	return client;
}

function get(data, cacheServer) {
	console.log("in Get");
	cacheServer.get(data, (err, output) => {
		if (output) {
			return output;
		} else {
			return '';
		}
	});
}

function set(data, result, cacheServer) {
	console.log("in set");
	cacheServer.setex(data, 1440, result);
}

module.exports = { start, get, set };