import {Routes} from './routes';
import {Route} from './route';
import {createReadStream} from 'fs';
import {LineStream} from 'byline';
import {Writable} from 'stream';

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
            .pipe(new LineStream());
        
        source.on('error', (e) => {
            console.log('Error loading routes');
            reject(e);
        });

        source.on('finish', () => {
            console.log('Finished loading routes');
            resolve(new Routes(routes));
        });

        source.on('data', (line) => {
            console.log('===>  ' + line);
        });
    });
}
