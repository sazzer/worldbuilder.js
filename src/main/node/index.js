import {Handler} from './handler';

const Percolator = require('percolator').Percolator;

const server = new Percolator();
server.route('/hello', Handler);

server.listen((err) => {
    console.log('server is listening on port ', server.port);
});

