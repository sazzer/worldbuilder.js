import {config} from 'config';
import {Server} from 'server/server';
import {Routes} from 'server/routes/routes';
import {Route} from 'server/routes/route';
import {loadRoutes} from 'server/routes';
import {createLogger} from 'bunyan';

/** The logger to use */
const LOG = createLogger({name: 'server.routes.routes'});


loadRoutes('target/main/routes')
    .then((routes) => {

        const server = new Server({
            port: config.port,
            routes: routes
        });

        server.run();
    }).catch((e) => {
        LOG.error(`Error loading routes: ${e}`);
    });
