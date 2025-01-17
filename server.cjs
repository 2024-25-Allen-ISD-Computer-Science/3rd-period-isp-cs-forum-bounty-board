var express = require('express');
var path = require('path');

// Create an Express app
var app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle requests for your static HTML files
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use your existing CORS Anywhere proxy
var cors_proxy = require('./node_modules/cors-anywhere');
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

// Grab the blacklist and whitelist
var originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);

function parseEnvList(env) {
  if (!env) {
    return [];
  }
  return env.split(',');
}

var checkRateLimit = require('./node_modules/rate-limit')
cors_proxy.createServer({
  originBlacklist: originBlacklist,
  originWhitelist: originWhitelist,
  requireHeader: ['origin', 'x-requested-with'],
  checkRateLimit: checkRateLimit,
  removeHeaders: [
    'cookie',
    'cookie2',
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
  },
}).listen(port, host, function () {
  console.log('CORS Anywhere running on ' + host + ':' + port);
});

// Start the Express app
var htmlPort = process.env.HTML_PORT || 3000;
app.listen(htmlPort, function () {
  console.log('HTML server running on http://localhost:' + htmlPort);
});
