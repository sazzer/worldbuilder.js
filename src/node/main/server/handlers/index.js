import DebugHandler from './debug';
import InternalAuthHandler from './authentication/internal';

let handlers = {};

[DebugHandler, InternalAuthHandler].forEach((h) => {
    Object.keys(h).forEach((key) => {
        handlers[key] = h[key];
    });
});

export default handlers;
