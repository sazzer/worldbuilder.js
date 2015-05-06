module.exports = {    
    GET : (req, res) => {
        res.object({message : 'Hello World!'}).send();
    }
};

