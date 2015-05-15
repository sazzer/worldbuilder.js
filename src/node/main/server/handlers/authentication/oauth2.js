import {createLogger} from 'logger';
import {getUserByUsername} from 'users/userService';

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
    password: {
        handler: resourceOwnerPasswordCredentialsToken,
        params: {
            username: {
                required: true
            },
            password: {
                required: true
            },
            scope: {
                required: false,
                default: [],
                parse: (value) => value.split(/\s/)
            }
        }
    }
};

/**
 * Handler function for the OAuth2 Token flows
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export function token(req, res) {
    const grantType = req.body['grant_type'];
    const handler = TOKEN_HANDLERS[grantType];

    if (handler) {
        const params = {};
        const missingParams = [];

        Object.keys(handler.params).forEach((p) => {
            const paramDef = handler.params[p];
            let value = req.body[p];
            const paramName = paramDef.paramName || p;

            if (value === undefined) {
                value = paramDef.default;
            } else if (typeof paramDef.parse === 'function') {
                value = paramDef.parse(value);
            }

            if (value === undefined && paramDef.required) {
                missingParams.push(p);
            }

            params[paramName] = value;
        });

        if (missingParams.length > 0) {
            res.status(400).json({ error: 'invalid_request' });
        } else {
            handler.handler(params)
                .then(() => {
                    LOG.info("OAuth2 Token request succeeded");
                    res.json("Hello");
                }).catch((e) => {
                    LOG.info(e, "OAuth2 Token request failed");
                    res.status(400).json(e);
                });
        }
    } else {
        res.status(400).json({ error: 'unsupported_grant_type' });
    }
}

/**
 * Handler for the OAuth2 Resource Owner Password Credentials Grant
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to authenticate
 * @param {Array} scope - The scopes to authenticate
 * @return {Promise} a promise for the authentication token
 */
function resourceOwnerPasswordCredentialsToken({username, password, scope}) {
    LOG.info({username, scope}, "Performing a Resource Owner Password Credentials grant");
    return getUserByUsername(username)
        .then((user) => {
            if (!user.password.equals(password)) {
                throw {
                    username,
                    error: 'invalid_password'
                };
            } else if (!user.enabled) {
                throw {
                    username,
                    error: 'user_disabled'
                };
            } else {
                return user;
            }
        })
        .catch((e) => {
            LOG.info({username, scope, error: e}, "Authentication failed");
            throw {
                error: 'invalid_grant'
            };
        });
}
