import app from 'express';
import {Server as HttpServer} from 'http';
import bodyParser from 'body-parser';

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
    }

    /**
     * Actually start the server running
     * @access public
     */
    run() {
        this._app = app();
        this._http = HttpServer(this._app);
        this._app.use(bodyParser.urlencoded({extended: false}));
        this._app.use(bodyParser.json());

        this._http.listen(this._port, () => {
            console.log("Listening on port: " + this._port);
        });
    }
};
