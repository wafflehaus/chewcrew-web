'use strict'

// TODO: Find a way to change this based on environment (dev/prod)
// When dev, should be localhost. When prod, should be chewcrew.cc
var api = 'http://localhost:8080/sessions';

var sessionGet = function(sessionId, voterId, callback) {
	var url = api + '/' + sessionId + '?' + 'voterid=' + voterId;
	sessionExecute('GET', url, callback);
};

var sessionCreate = function(hostname, callback) {
	var url = api + '?' + 'name=' + hostname;
	sessionExecute('POST', url, callback);
};

var sessionJoin = function(sessionId, voterName, callback) {
	var url = api + '/' + sessionId + '/join' + '?' + 'name=' + voterName;
	sessionExecute('POST', url, callback);
};

var sessionReady = function(sessionId, voterId, callback) {
	var url = api + '/' + sessionId + '/ready' + '?' + 'voterid=' + voterId;
	sessionExecute('POST', url, callback);
};

var sessionVote = function(sessionId, voterId, choiceId, callback) {
	var url = api + '/' + sessionId + '/vote' + '?' + 'voterid=' + voterId + '&' + 'choiceid=' + choiceId;
	sessionExecute('POST', url, callback);
};

var sessionExecute = function(type, url, callback) {
	marmottajax({
	        method: type,
	        url: url,
	        json: true,
	    })
	    .then(function(data) {
	        callback(data);
	    })
	    .error(function(msg) {
	    	callback({"error": msg});
	    });
};