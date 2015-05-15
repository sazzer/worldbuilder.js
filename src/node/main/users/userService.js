import {createLogger} from 'logger';

/** The logger to use */
const LOG = createLogger({name: 'users.userService'});

/**
 * Get the User account tha thas the given Username
 * @param {string} username - The username to look up
 * @return {Promise} a promise for the user
 */
export function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        LOG.info({username}, "Looking up user details");
        reject({error: "unknown_user"});
    });
}
