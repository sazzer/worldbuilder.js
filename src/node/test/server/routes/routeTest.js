import {expect} from 'chai';
import {Route} from 'server/routes/route';

describe('Route', () => {
    describe('getters', () => {
        describe('Fully Specified', () => {
            const route = new Route('GET',
                '/route/test',
                'test/module',
                'entity', {
                    name: 'myRoute'
                });
                it('returns the correct method', () => {
                    expect(route.method).to.equal('GET');
                });
                it('returns the correct url', () => {
                    expect(route.url).to.equal('/route/test');
                });
                it('returns the correct module', () => {
                    expect(route.module).to.equal('test/module');
                });
                it('returns the correct entity', () => {
                    expect(route.entity).to.equal('entity');
                });
                it('returns the correct name', () => {
                    expect(route.name).to.equal('myRoute');
                });
        });
        describe('Defaulted', () => {
            const route = new Route('GET',
                '/route/test',
                'test/module',
                'entity');
                it('returns the correct method', () => {
                    expect(route.method).to.equal('GET');
                });
                it('returns the correct url', () => {
                    expect(route.url).to.equal('/route/test');
                });
                it('returns the correct module', () => {
                    expect(route.module).to.equal('test/module');
                });
                it('returns the correct entity', () => {
                    expect(route.entity).to.equal('entity');
                });
                it('returns the correct name', () => {
                    expect(route.name).to.equal('GET:/route/test');
                });
        });
    });
});
