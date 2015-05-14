import {Routes} from './routes';
import {Route} from './route';
import {createReadStream} from 'fs';
import {LineStream} from 'byline';
import {Transform} from 'stream';

/** The regex to match a line */
const LINE_REGEX = /^([A-Za-z]+)\s+'(.+?)'\s*=\s*'(.+?)#(.+?)'(, *(.*))?$/;

/** The regex to match a comment line */
const COMMENT_REGEX = /^\#/;

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
            const result = chunk.match(LINE_REGEX);
            if (result) {
                const method = result[1];
                const url = result[2];
                const module = result[3];
                const entity = result[4];

                this.push(new Route(method,
                    url,
                    module,
                    entity));
            } else {
                console.log(`Invalid line: ${chunk}`);
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

        console.log('Loading routes from: ' + routesFile);

        const source = createReadStream(routesFile, {encoding: 'utf8'})
            .pipe(new LineStream())
            .pipe(new RouteParsingStream());

        source.on('data', (route) => {
            console.log('Adding route:  ' + route);
            routes.push(route);
        });

        source.on('error', (e) => {
            console.log(`Error loading routes: ${e}`);
            reject(e);
        });

        source.on('finish', () => {
            console.log('Finished loading routes');
            resolve(new Routes(routes));
        });
    });
}
