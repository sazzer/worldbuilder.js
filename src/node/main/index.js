import {config} from 'config';
import {Server} from 'server/server';
import Handlers from 'server/handlers';

const server = new Server({
    port: config.port
});

server.addHandlers(Handlers);

server.run();
