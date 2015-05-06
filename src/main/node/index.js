var Percolator = require('percolator').Percolator;

var server = new Percolator();
server.route('/hello', require('./handler'));

server.listen((err) => {
    console.log('server is listening on port ', server.port);
});

