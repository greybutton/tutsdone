const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const Pusher = require('pusher');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const port = process.env.PORT || 8080;

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://greybutton.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3001/api/',
    issuer: "https://greybutton.eu.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

//initialize Pusher with your appId, key and secret
const pusher = new Pusher({
  appId: '462435',
  key: '95d66ccf9a4b13a29895',
  secret: '6aaeabd88882df5a69d8',
  cluster: 'ap1',
  encrypted: true
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API route which the chat messages will be sent to
app.post('/message/send', (req, res) => {
  // 'private' is prefixed to indicate that this is a private channel
    pusher.trigger( 'private-reactchat', 'messages', {
        message: req.body.message,
        username: req.body.username
    });
    res.sendStatus(200);
});

// API route used by Pusher as a way of authenticating users
app.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});

// Set port to be used by Node.js
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});