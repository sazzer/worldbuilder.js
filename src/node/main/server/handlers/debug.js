export default function(app) {
    app.get("/api/debug/ping", (req, res) => {
        res.json({message: 'Hello, World!'});
    });
}
