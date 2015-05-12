import {config} from 'config';
import {Server} from 'server/server';
import DebugHandler from 'server/handlers/debug';

const server = new Server({
    port: config.port
});

server.addHandlers(DebugHandler);

server.run();
