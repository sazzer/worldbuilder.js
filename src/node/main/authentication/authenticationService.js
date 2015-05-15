import {now} from 'clock';
import {AccessToken} from './accessToken';

const EXPIRY_SECONDS = 3600;

/**
 * Authenticate the given user and produce an access token
 * @param {User} user - The user to authenticate
 * @return {AccessToken} - The access token
 */
export function authenticateUser(user) {
    const expires = now().add(EXPIRY_SECONDS, 'seconds');

    return new AccessToken({
        token: user.userId,
        expires
    });
}
