import express from 'express';
import {Server as HttpServer} from 'http';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import {createLogger} from 'logger';
import expressLogger from 'express-bunyan-logger';
import {getNamespace} from 'continuation-local-storage';

/** The logger to use */
const LOG = createLogger({name: 'server.routes.routes'});


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
        app.use(expressLogger());
        app.use(expressLogger.errorLogger());
        app.use(responseTime());

        app.use((req, res, next) => {
            const requestId = req.id;
            res.set('X-Request-ID', requestId);
            LOG.debug({req_id: requestId}, "New request: " + requestId);

            const namespace = getNamespace('uk.co.grahamcox.worldbuilder');

            namespace.bindEmitter(req);
            namespace.bindEmitter(res);
            namespace.run(() => {
                namespace.set('requestId', requestId);
                next();
            });
        });


        this._routes.apply(app, '/api');

        const http = HttpServer(app);
        http.listen(this._port, () => {
            LOG.info("Listening on port: " + this._port);
        });
    }
};
