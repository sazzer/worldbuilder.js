import {config} from 'config';
import {Server} from 'server/server';
import {Routes} from 'server/routes/routes';
import {Route} from 'server/routes/route';

const routes = new Routes([
    new Route('GET', '/debug/ping', 'server/handlers/debug', 'ping')
]);

const server = new Server({
    port: config.port,
    routes: routes
});

server.run();
