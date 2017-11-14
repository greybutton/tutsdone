var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './assets')));
app.use(express.static(path.resolve(__dirname, './src')));
app.use(express.static(path.resolve(__dirname, './dist')));
app.use(express.static(path.resolve(__dirname, './node_modules')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './', 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
