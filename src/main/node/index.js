import {Handler} from './handler';
import {config} from './config';

const Percolator = require('percolator').Percolator;

const server = new Percolator({
    port: config.port
});

server.route('/hello', Handler);

server.listen((err) => {
    console.log('server is listening on port ', server.port);
});

