import express from 'express';
import {Server as HttpServer} from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import responseTime from 'response-time';

/**
 * The actual main server that does all of the HTTP work
 * @access public
 */
export class Server {
    /**
     * Construct the server
     * @param {Object} [options] - The options to construct with
     * @param {number} [options.port] - The port number to listen on
     * @access public
     */
    constructor(options = {port: 5000}) {
        this._port = options.port;
        this._routes = options.routes;
    }

    /**
     * Actually start the server running
     * @access public
     */
    run() {
        const app = express();
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(morgan('combined'));
        app.use(responseTime());

        this._routes.apply(app, '/api');

        const http = HttpServer(app);
        http.listen(this._port, () => {
            console.log("Listening on port: " + this._port);
        });
    }
};
