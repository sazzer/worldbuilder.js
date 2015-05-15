/**
 * Representation of a user
 */
export class User {
    /**
     * Construct the user
     * @param {string} userId - The User ID
     * @param {string} username - The username
     * @param {Password} password - The password
     * @param {boolean} enabled - Whether the user is enabled or not
     */
    constructor({userId, username, password, enabled = true}) {
        this._userId = userId;
        this._username = username;
        this._password = password;
        this._enabled = enabled;
    }

    /**
     * Get the user ID
     * @return {string} the user ID
     */
    get userId() {
        return this._userId;
    }

    /**
     * Get the username
     * @return {string} the username
     */
    get username() {
        return this._username;
    }

    /**
     * Get the password
     * @return {Password} the password
     */
    get password() {
        return this._password;
    }

    /**
     * Get if the user is enabled
     * @return {boolean} whether the user is enabled
     */
    get enabled() {
        return this._enabled;
    }
};
