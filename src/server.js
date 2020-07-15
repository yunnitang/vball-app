import express from 'express';
import http from 'http';
import routes from './routes.js';
import path from 'path';
import Data from './Data.js';

// Create Game array
global.data = new Data();

const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/',routes);



server.listen(8000, () => {
	console.log('Example app listening on port 8000!');
});	