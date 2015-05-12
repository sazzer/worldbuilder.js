export default {
    '/api/debug/hello': {
        GET : (req, res) => {
            res.object({message : 'Hello World!'}).send();
        }
    }
};
