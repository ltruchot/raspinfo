// node dependencies
import * as compression from 'compression'; // helper to serve gzipped website in production
import * as http from 'http'; // helper for manager servers
import * as path from 'path'; // helper to manage path of folder/files

// npm dependencies
import * as bodyParser from 'body-parser'; // a parser for incoming request bodies
import * as express from 'express'; // a server
import * as morgan from 'morgan'; // a logger for REST API

// npm i -g pm2
// npm i --save webpack-node-externals express morgan body-parser
// npm i --save-dev ts-loader @types/express @types/morgan

// local dependencies
// import { environment } from './../config/settings';

// create app
const app = express();

// app config
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Point static path to dist
app.use(express.static(__dirname));

// Catch all other routes and return the index file
app.get('*', (_req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));
