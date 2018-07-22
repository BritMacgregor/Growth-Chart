//IMPORTS REQUIRED DEPENDENCIES AND ROUTE FOLDERS

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes');

// LOADS MONGOOSE PACKAGES
const mongoose = require('mongoose');

//CONNECT TO MONGODB AND CREATE/USE DATABASE AS CONFIGURED
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// IMPORT ALL MONGOOSE MODELS
require('./models/chart.model.js');

const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/api', router);

//THE EXPRESS SERVER
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});
