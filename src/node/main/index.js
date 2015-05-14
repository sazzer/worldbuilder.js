import {config} from 'config';
import {Server} from 'server/server';
import {Routes} from 'server/routes/routes';
import {Route} from 'server/routes/route';
import {loadRoutes} from 'server/routes';

const routes = new Routes([
    new Route('GET', '/debug/ping', 'server/handlers/debug', 'ping')
]);

const server = new Server({
    port: config.port,
    routes: routes
});

loadRoutes('/home/graham/source/worldbuilder.js/src/node/main/routes')
    .then((routes) => {
    });

server.run();
