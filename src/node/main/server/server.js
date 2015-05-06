import {Percolator} from 'percolator';

export class Server {
    constructor(options = {}) {
        this._percolator = new Percolator({
            port: options.port
        });
    }

    run() {
        this._percolator.listen((err) => {
            console.log('server is listening on port: ', this._percolator.port);
        });
    }
};
