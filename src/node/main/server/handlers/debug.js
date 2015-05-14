import {createLogger} from 'bunyan';
import {getNamespace} from 'continuation-local-storage';

/** The logger to use */
const LOG = createLogger({name: 'server.handlers.debug'});


export function ping(req, res) {
    const namespace = getNamespace('uk.co.grahamcox.worldbuilder');
    const requestId = namespace.get('requestId');
    LOG.info({req_id: requestId}, "Responding to ping");
    res.json({message: 'Hello, World!'});
}

export function now(req, res) {
    const namespace = getNamespace('uk.co.grahamcox.worldbuilder');
    const requestId = namespace.get('requestId');
    LOG.info({req_id: requestId}, "Responding to now");
    res.json(new Date());
}
