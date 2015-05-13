/**
 * Class representing a route in the router
 */
export class Route {
    /**
     * Construct the route
     * @param {string} method - The HTTP Method for the route
     * @param {string} url - The URL for the route
     * @param {string} module - The Node module to use for the route
     * @param {string} entity - The entity in the module to handle the route
     * @param {string} [name] - The name of the route
     */
    constructor(method, url, module, entity, name = method + ":" + url) {
        this._method = method;
        this._url = url;
        this._module = module;
        this._entity = entity;
        this._name = name;
    }

    /**
     * Get the HTTP Method for the route
     * @return {string} The HTTP Method for the route
     */
     get method() {
         return this._method;
     }

     /**
      * Get the URL for the route
      * @return {string} The URL for the route
      */
     get url() {
         return this._url;
     }

     /**
      * Get the node module to use for the route
      * @return {string} the node module to use
      */
     get module() {
         return this._module;
     }

     /**
      * Get the entity inside the module
      * @return {string} the name of the entity in the module
      */
     get entity() {
         return this._entity;
     }

     /**
      * Get the name of the route
      * {string} the name of the route
      */
     get name() {
         return this._name;
     }
}
