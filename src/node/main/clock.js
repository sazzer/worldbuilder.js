import moment from 'moment-timezone';

/**
 * Get the current time
 * @return {Moment} the current time
 */
export function now() {
    return moment().tz('UTC');
}
