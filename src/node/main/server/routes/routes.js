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
            const handlerMethod = handler[route.entity];
            const expressMethod = route.method.toLowerCase();

            console.log(`${route.method} ${url} => ${handlerMethod}`);

            app[expressMethod](url, handlerMethod);
        });
    }
}
