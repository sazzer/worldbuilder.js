import {createLogger} from 'logger';
import {User} from './user';
import {hash} from './password';

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

        if (username === "graham") {
            resolve(new User({
                userId: 'abc123',
                username: username,
                password: hash('password'),
                enabled: true
            }));
        } else if (username === "bob") {
            resolve(new User({
                userId: 'abc123',
                username: username,
                password: hash('password'),
                enabled: false
            }));
        } else {
            reject({error: "unknown_user"});
        }
    });
}
