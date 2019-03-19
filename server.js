
'use strict';

var errorHandler;

if (process.env.NODE_ENV === 'production') {
  require('@google/cloud-trace').start();
  errorHandler = require('@google/cloud-errors').start();
}

if (process.env.GCLOUD_PROJECT) {
  require('@google-cloud/debug-agent').start();
}

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var google = require('googleapis');
var youtube = google.youtube('v3');

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data.json', function (req, res, next) {
  youtube.search.list({
    part: 'snippet',
    type: 'video',
    q: 'google+cardboard+video+3d',
    auth: process.env.API_KEY
  }, function (err, result) {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

app.get('/search', function (req, res, next) {
  youtube.search.list({
    part: 'snippet',
    type: 'video',
    q: req.query.q
  }, function (err, result) {
    if (err) {
      return next(new Error('Search error!'));
    }
    res.json(result);
  });
});

app.use('*', function (req, res) {
  return res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Basic error logger/handler
app.use(function (err, req, res, next) {
  res.status(500).send(err.message || 'Something broke!');
  next(err || new Error('Something broke!'));
});
if (process.env.NODE_ENV === 'production') {
  app.use(errorHandler.express);
}

if (module === require.main) {
  // Start the server
  var server = app.listen(process.env.port || 8080, function () {
    var port = server.address().port;

    console.log('App listening on port %s', port);
    console.log('Press Ctrl+C to quit.');
  });
}

module.exports = app;
