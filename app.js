'use strict';

const restify = require('restify');
const fs = require('fs');

const server = restify.createServer();
server.use(restify.bodyParser());

server.get(/.*/, restify.serveStatic({
  'directory': 'static',
  'default': 'index.html'
}));


server.post('/logData/', (req, res, next) => {
	console.dir('Data received!');
	console.dir(req.body);
	res.send();
	return next();
});

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
