import {createLogger} from 'bunyan';

/** The logger to use */
const LOG = createLogger({name: 'server.routes.routes'});

/**
 * Representation of the entire set of routes in the system
 */
export class Routes {
    /**
     * Construct the routes
     * {array} routes - The array of all loaded routes
     */
    constructor(routes) {
        this._routes = routes;
    }

    /**
     * Get the routes that we are working with
     * @return {array} the routes
     */
    get routes() {
        return this._routes;
    }

    /**
     * Apply all of the routes to the given server
     * @param {Express} app - The Express application to register routes on
     * @param {string} base - The base URL of the routes
     */
    apply(app, base) {
        this._routes.forEach((route) => {
            const url = base + route.url;
            const handler = require(route.module);
            if (handler !== undefined) {
                const handlerMethod = handler[route.entity];
                if (handlerMethod !== undefined) {
                    const expressMethod = route.method.toLowerCase();

                    LOG.debug(`${route.method} ${url} => ${route.module}.${route.entity}`);

                    app[expressMethod](url, handlerMethod);
                } else {
                    LOG.warn(`Handler entity not found: ${route.module}.${route.entity}`);
                }
            } else {
                LOG.warn(`Handler module not found: ${route.module}`);
            }
        });
    }
}
