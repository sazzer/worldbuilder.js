import {createLogger} from 'bunyan';
import {Routes} from './routes';
import {Route} from './route';
import {createReadStream} from 'fs';
import {LineStream} from 'byline';
import {Transform} from 'stream';

/** The logger to use */
const LOG = createLogger({name: 'server.routes.loadRoutes'});

/** The regex to match a comment line */
const COMMENT_REGEX = /^\#/;

/** The regex to match a line */
const LINE_REGEX = /^([A-Za-z]+)\s+'(.+?)'\s*=\s*'(.+?)#(.+?)'(, *(.*))?$/;

/** Regex group for the HTTP Method */
const METHOD_GROUP = 1;
/** Regex group for the URL  */
const URL_GROUP = 2;
/** Regex group for the module */
const MODULE_GROUP = 3;
/** Regex group for the entity in the module */
const ENTITY_GROUP = 4;
/** Regex group for the route flags */
const FLAGS_GROUP = 5;

/**
 * Transform Stream to parse a line in the routes file into an actual Route
 */
class RouteParsingStream extends Transform {
    /**
     * Ensure that objectMode is on so that we can pass Route instances down the stream
     */
    constructor() {
        super({objectMode: true});
    }

    /**
     * Transform the provided line into a Route
     * @param {string} chunk - The chunk to parse
     * @param {string} encoding - The encoding of the chunk
     * @param {function} callback - The callback function to use
     */
    _transform(chunk, encoding, callback) {

        if (!COMMENT_REGEX.test(chunk)) {
            const result = chunk.trim().match(LINE_REGEX);
            if (result) {
                const method = result[METHOD_GROUP].trim();
                const url = result[URL_GROUP].trim();
                const module = result[MODULE_GROUP].trim();
                const entity = result[ENTITY_GROUP].trim();
                const flags = {};

                if (result[FLAGS_GROUP]) {
                    result[FLAGS_GROUP].split(/,/)
                        .map((flag) => flag.trim())
                        .filter((flag) => flag !== undefined && flag !== "")
                        .map((flag) => flag.split(/:/))
                        .forEach((flag) => {
                            const key = flag[0];
                            const value = flag[1];
                            LOG.debug(`Flag ${key} = ${value}`);
                            flags[key.trim()] = value.trim();
                        });
                }


                this.push(new Route(method,
                    url,
                    module,
                    entity,
                    flags));
            } else {
                LOG.warn(`Invalid line: ${chunk}`);
            }
        }

        callback();
    }
}

/**
 * Load the routes that are defined in the given file
 * @param {string} routes - The file to load the routes from
 * @return {Promise} A promise for the parsed routes
 */
export function loadRoutes(routesFile) {
    return new Promise((resolve, reject) => {
        const routes = [];

        LOG.info('Loading routes from: ' + routesFile);

        const source = createReadStream(routesFile, {encoding: 'utf8'})
            .pipe(new LineStream())
            .pipe(new RouteParsingStream());

        source.on('data', (route) => {
            LOG.debug('Adding route: ' + route);
            routes.push(route);
        });

        source.on('error', (e) => {
            LOG.error(`Error loading routes: ${e}`);
            reject(e);
        });

        source.on('finish', () => {
            LOG.trace('Finished loading routes');
            resolve(new Routes(routes));
        });
    });
}
