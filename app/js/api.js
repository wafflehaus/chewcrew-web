// TODO: Find a way to change this based on environment (dev/prod)
// When dev, should be localhost. When prod, should be chewcrew.cc
var apiurl = 'http://localhost:8080/room';

function api() {}

api.get = function(id, callback) {
	var url = apiurl + '?id=' + apiId;
	api.execute('GET', url, callback);
}

api.create = function(address, callback) {
	var url = apiurl + '/new' + '?address=' + address;
	api.execute('POST', url, callback);
}

api.vote = function(id, name, vote, callback) {
	var url = apiurl + '/vote' + '?id=' + id + '&name=' + name + '&vote=' + vote;
	api.execute('POST', url, callback);
}

api.end = function(id, hostid, callback) {
	var url = apiurl + '/end' + '?id=' + id + '&hostid=' + hostid;
	api.execute('POST', url, callback);
}

api.execute = function(method, url, callback) {
	var req = new XMLHttpRequest();
	req.open(method, url, true);

	req.onload = function() {
  		if (req.status >= 200 && req.status < 400) {
			var data = JSON.parse(req.responseText);
    			callback(data);
  		} else {
			var err = JSON.parse(req.responseText);
			callback(err);
  		}
	};
	
	req.onerror = function() {
		callback('{"error": "Network connection failure"}')
	};
	req.send();
}
