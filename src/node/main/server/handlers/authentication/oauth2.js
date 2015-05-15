import {createLogger} from 'bunyan';
import {getNamespace} from 'continuation-local-storage';

/** The logger to use */
const LOG = createLogger({name: 'server.handlers.authentication.oauth2'});

/**
 * Handler function for the OAuth2 Authorize flows
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export function authorize(req, res) {
}

/** Map of the Grant Type to handler functions for the Token endpoint */
const TOKEN_HANDLERS = {
    password: authorizationCodeToken
};

/**
 * Handler function for the OAuth2 Token flows
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export function token(req, res) {
    const grantType = req.params['grant_type'];
    const handler = TOKEN_HANDLERS[grantType];

    if (handler) {
        handler(req)
            .then(() => {
            }).catch((e) => {
                res.status(400).json(e);
            });
    } else {
        res.status(400).json({ error: 'invalid_grant' });
    }
}

/**
 * Handler for the OAuth2 Resource Owner Password Credentials Grant
 * @param {object} params - The parameters to the request
 * @return {Promise} a promise for the authentication token
 */
function authorizationCodeToken(req) {
    return new Promise((resolve, reject) => {
        reject({error: 'invalid_request'});
    });
}
