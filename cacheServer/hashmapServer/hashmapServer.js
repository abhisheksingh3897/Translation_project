var HashMap = require('hashmap');

function start() {
	var map = new HashMap();
	return map;
}

function get(data,cacheServer) {
	return cacheServer.get(data);
}

function set(data, result,cacheServer) {
	cacheServer.set(data, result);
}

module.exports = { start,get, set };