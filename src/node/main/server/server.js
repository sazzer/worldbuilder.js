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
     * Actually start the server running
     * @access public
     */
    run() {
        this._percolator.listen((err) => {
            console.log('server is listening on port: ', this._percolator.port);
        });
    }
};
