import DebugHandler from './debug';

let handlers = {};

[DebugHandler].forEach((h) => {
    Object.keys(h).forEach((key) => {
        handlers[key] = h[key];
    });
});

export default handlers;
