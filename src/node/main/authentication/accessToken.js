/**
 * Representation of an Access Token
 */
export class AccessToken {
    /**
     * Construct the access token
     * @param {string} token - The access token ID
     * @param {Moment} expires - The expiry of the token
     */
    constructor({token, expires}) {
        this._token = token;
        this._expires = expires;
    }

    /**
     * Get the access token ID
     * @return {string} the access token ID
     */
    get token() {
        return this._token;
    }

    /**
     * Get the expiry time of the token
     * @return {Moment} the expiry time of the token
     */
    get expires() {
        return this._expires;
    }
}
