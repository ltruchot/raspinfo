// node dependencies
import * as compression from 'compression'; // helper to serve gzipped website in production
import * as http from 'http'; // helper for manager servers
import * as path from 'path'; // helper to manage path of folder/files

// npm dependencies
import * as express from 'express'; // a server
import * as morgan from 'morgan'; // a logger for REST API

// custom dependencies
import { setOsRoutes } from './api/routes/os.routes';

const indexPath = path.join(__dirname, process.env.NODE_ENV === 'development' ?
	'./../index.html' :
	'index.html');

// npm i -g pm2
// npm i --save webpack-node-externals express morgan
// npm i --save-dev ts-loader @types/express @types/morgan

// local dependencies
// import { environment } from './../config/settings';

// create app
const app: express.Application = express();

// app config
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Point static path to dist
app.use(express.static(__dirname));

// add custom routes
setOsRoutes(app);

// Catch all other routes and return the index file
app.get('*', (_req: express.Request, res: express.Response) => {
	res.sendFile(indexPath);
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));
