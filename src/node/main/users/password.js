import {v4 as uuid} from 'node-uuid';
import {createHash} from 'crypto';

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
        let result;
        if (password instanceof Password) {
            result = (password._salt === this._salt && password._hash === this._hash);
        } else if (typeof password === 'string') {
            const newHash = hash(password, this._salt);
            result = (newHash._salt === this._salt && newHash._hash === this._hash);
        } else {
            result = false;
        }
        return result;
    }
}

/**
 * Hash the provided password, either generating the salt or using the provided one
 * @param {string} password - The password to hash
 * @param {string} salt - The salt to apply. If undefined then generate some salt
 * @return {Password} the password
 */
export function hash(password, salt = uuid()) {
    const hashed = createHash('sha256')
        .update(salt)
        .update(password)
        .digest('base64');
    return new Password(salt, hashed);
}
