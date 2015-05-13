import {config} from 'config';
import {Server} from 'server/server';
import handlers from 'server/handlers';

const server = new Server({
    port: config.port
});

server.addHandlers(handlers);

server.run();
