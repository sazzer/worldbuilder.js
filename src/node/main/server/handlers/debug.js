export function ping(req, res) {
    res.json({message: 'Hello, World!'});
}

export function now(req, res) {
    res.json(new Date());
}
