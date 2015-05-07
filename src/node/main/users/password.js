/**
 * Representation of a Password that has already been hashed
 */
export class Password {
    /**
     * Construct an already-hashed password
     * @param {string} salt - The Salt that was applied to the password
     * @param {string} hash - The Hashed password
     */
    constructor(salt, hash) {
        this._salt = salt;
        this._hash = hash;
    }

    /**
     * Get the Salt for the password
     * @return {string} The salt
     */
    get salt() {
        return this._salt;
    }

    /**
     * Get the Hash for the password
     * @return {string} The hash
     */
    get hash() {
        return this._hash;
    }

    /**
     * Compare this password to another one
     * @param {any} password The password to compare against. This is either a
     * Password instance or a String
     * @return {boolean} True if the passwords match. False if not
     */
    equals(password) {
        return false;
    }
}
