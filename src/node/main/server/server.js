import {Percolator} from 'percolator';

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
    constructor(options = {}) {
        this._percolator = new Percolator({
            port: options.port
        });
    }

    /**
     * Add a collection of handlers to the server
     * @param {Object} handler - the handlers to register. The key is the route and the value is the
     * handler for this route
     */
    addHandlers(handlers) {
        Object.keys(handlers).forEach((key) => {
            this.addHandler(key, handlers[key]);
        });
    }

    /**
     * Add a new handler to the server
     * @param {string} route - The route to add the handler onto
     * @param {Object} handler - The handler to add
     */
    addHandler(route, handler) {
        this._percolator.route(route, handler);
    }

    /**
     * Actually start the server running
     * @access public
     */
    run() {
        this._percolator.listen((err) => {
            console.log('server is listening on port: ', this._percolator.port);
        });
    }
};
