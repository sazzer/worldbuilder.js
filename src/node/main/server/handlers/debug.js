import {createLogger} from 'logger';

/** The logger to use */
const LOG = createLogger({name: 'server.handlers.debug'});


export function ping(req, res) {
    LOG.info("Responding to ping");
    res.json({message: 'Hello, World!'});
}

export function now(req, res) {
    LOG.info("Responding to now");
    res.json(new Date());
}
