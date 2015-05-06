export const Handler = {    
    GET : (req, res) => {
        res.object({message : 'Hello World!'}).send();
    }
};

