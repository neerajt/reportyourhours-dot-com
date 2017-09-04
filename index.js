const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  serveStatic = require('serve-static');

const app = express();
const apiRoutes = require('./routes/api/v1');

app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, 'public')));

app.use('/api/v1', apiRoutes);

app.listen((process.env.PORT || 3000), function () {
  console.log('Example app listening on port!')
});
