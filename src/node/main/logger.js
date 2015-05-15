import {createLogger as createBunyanLogger} from 'bunyan';
import {getNamespace} from 'continuation-local-storage';

/** List of supported log levels */
const LOG_LEVELS = [
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "fatal"
];

/**
 * Create a new logger to use for logging with
 * @param {Any} arguments to pass to bunyan to create the logger with
 * @return {Object} the logger to use
 */
export function createLogger(args) {
    const logger = createBunyanLogger(args);

    const result = {};

    LOG_LEVELS.forEach((level) => {
        result[level] = function(...msg) {
            const namespace = getNamespace('uk.co.grahamcox.worldbuilder');
            const requestId = namespace.get('requestId');

            const innerLogger = logger.child({req_id: requestId});
            innerLogger[level](...msg);
        }
    });

    return result;
}
