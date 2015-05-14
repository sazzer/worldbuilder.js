import {config} from 'config';
import {Server} from 'server/server';
import {Routes} from 'server/routes/routes';
import {Route} from 'server/routes/route';
import {loadRoutes} from 'server/routes';

loadRoutes('/Users/coxg/temp/worldbuilder/src/node/main/routes')
    .then((routes) => {

        const server = new Server({
            port: config.port,
            routes: routes
        });

        server.run();
    }).catch((e) => {
        console.log(`Error loading routes: ${e}`);
    });
