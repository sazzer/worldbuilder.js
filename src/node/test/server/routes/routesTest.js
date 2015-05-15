import {expect} from 'chai';
import {Route} from 'server/routes/route';
import {Routes} from 'server/routes/routes';
import mockery from 'mockery';
import sinon from 'sinon';

describe('Routes', () => {
    const routes = new Routes([
        new Route('GET', '/route/test', 'test/module', 'entity'),
        new Route('GET', '/route1/test', 'test/module1', 'entity2'),
        new Route('POST', '/route/test1', 'test1/module', 'entity3')
    ]);

    describe('getters', () => {
        const gotRoutes = routes.routes;
        it('is an array', () => {
            expect(gotRoutes).to.be.an('array')
        });
        it('is of length 3', () => {
            expect(gotRoutes).to.have.length(3);
        });
        it('has the correct entries', () => {
            // We just check the URLs for brevity
            expect(gotRoutes[0].url).to.equal('/route/test');
            expect(gotRoutes[1].url).to.equal('/route1/test');
            expect(gotRoutes[2].url).to.equal('/route/test1');
        });
    });
    describe('apply', () => {
        describe('All routes are valid', () => {
            let app = {};
            let mod1 = {entity: 1};
            let mod2 = {entity2: 2};
            let mod3 = {entity3: 3};
            before(() => {
                app.get = sinon.spy();
                app.post = sinon.spy();

                mockery.enable();
                mockery.registerMock('test/module', mod1);
                mockery.registerMock('test/module1', mod2);
                mockery.registerMock('test1/module', mod3);
                routes.apply(app, '/base');
            });

            it('called get twice', () => {
                expect(app.get.callCount).to.equal(2);
            });
            it('called get for /route/test', () => {
                expect(app.get.calledWithExactly('/base/route/test', mod1.entity)).to.be.true;
            });
            it('called get for /route1/test', () => {
                expect(app.get.calledWithExactly('/base/route1/test', mod2.entity2)).to.be.true;
            });
            it('called post once', () => {
                expect(app.post.callCount).to.equal(1);
            });
            it('called post for /route/test1', () => {
                expect(app.post.calledWithExactly('/base/route/test1', mod3.entity3)).to.be.true;
            });

            after(() => {
                mockery.deregisterAll();
                mockery.disable();
            });
        });
        describe('Handler doesnt contain entity', () => {
            const routes = new Routes([
                new Route('GET', '/route/test', 'test/module', 'entity')
            ]);

            let app = {};
            before(() => {
                app.get = sinon.spy();

                mockery.enable();
                mockery.registerMock('test/module', {});
                routes.apply(app, '/base');
            });

            it('didnt call get at all', () => {
                expect(app.get.callCount).to.equal(0);
            });

            after(() => {
                mockery.deregisterAll();
                mockery.disable();
            });
        });
        describe('Handler doesnt exist', () => {
            const routes = new Routes([
                new Route('GET', '/route/test', 'test/module', 'entity')
            ]);

            let app = {};
            before(() => {
                app.get = sinon.spy();

                mockery.enable();
                mockery.registerMock('test/module', undefined);
                routes.apply(app, '/base');
            });

            it('didnt call get at all', () => {
                expect(app.get.callCount).to.equal(0);
            });

            after(() => {
                mockery.deregisterAll();
                mockery.disable();
            });
        });
    });
});
