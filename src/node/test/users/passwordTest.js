import {expect} from 'chai';
import {Password} from 'users/password';

describe('Password', () => {
    const password = new Password('salt', 'hash');
    describe('get salt', () => {
        const salt = password.salt;
        it('should have the expected value', () => {
            expect(salt).to.equal("salt");
        });
    });
    describe('get hash', () => {
        const hash = password.hash;
        it('should have the expected value', () => {
            expect(hash).to.equal("hash");
        });
    });
});
