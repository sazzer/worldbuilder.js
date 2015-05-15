import {createLogger} from 'logger';

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
            let handler;
            try {
                handler = require(route.module);
            } catch (e) {
                handler = undefined;
                LOG.warn(e, 'Failed to load module')
            }
            if (handler !== undefined) {
                const handlerMethod = handler[route.entity];
                if (handlerMethod !== undefined) {
                    const expressMethod = route.method.toLowerCase();

                    LOG.info(`${route.method} ${url} => ${route.module}.${route.entity}`);

                    app[expressMethod](url, handlerMethod);
                } else {
                    LOG.warn({module: route.module, entity: route.entity}, 'Handler entity not found');
                }
            } else {
                LOG.warn({module: route.module}, 'Handler module not found');
            }
        });
    }
}
