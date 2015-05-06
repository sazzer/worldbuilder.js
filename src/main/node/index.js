var Percolator = require('percolator').Percolator;

var server = new Percolator();
server.route('/hello', {    
    GET : (req, res) => {
        res.object({message : 'Hello World!'}).send();
    }
});

server.listen((err) => {
    console.log('server is listening on port ', server.port);
});

