export default {
    '/api/authentication/internal': {
        basicAuthenticate: (username, password, req, res, cb) => {
            if (username === 'graham@grahamcox.co.uk' && password === 'password') {
                cb(null, {username: username, password: password});
            } else {
                res.object({'hello': 'world'});
                cb(true);
            }
        }, 
        POST : (req, res) => {
            res.object({auth: req.authenticated}).send();
        }
    }
};

