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

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
	console.log('Example app listening on port ${ PORT }!');
});	