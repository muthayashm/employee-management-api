const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const routes = require('./routes');
const PORT = 8081;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
mongoose.connect(config.mongoUrl, {useNewUrlParser: true});

app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});