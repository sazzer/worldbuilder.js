import {expect} from 'chai';
import {Password, hash} from 'users/password';

describe('Password', () => {
    describe('getters', () => {
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

    describe('hash', () => {
        describe('When providing a hash', () => {
            const password = hash('password', 'salt');
            it('should have the expectedsalt', () => {
                expect(password.salt).to.equal('salt');
            });
            it('should have a hash', () => {
                expect(password.hash).to.be.defined;
            });
            it('the hash should equal this string', () => {
                expect(password.hash).to.equal('E2Ab2k6njlWge5iGbSvmvgdE44ZvE8AMgRyrYIoo8yI=');
            });
        });
        describe('When generating a hash', () => {
            const password = hash('password');
            it('should have a salt', () => {
                expect(password.salt).to.be.defined;
            });
            it('should have a UUID salt', () => {
                expect(password.salt).to.match(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/);
            });
            it('should have a hash', () => {
                expect(password.hash).to.be.defined;
            });
            it('the hash should NOT equal the password', () => {
                expect(password.hash).to.not.equal('password');
            });
            it('the hash should NOT equal the salt', () => {
                expect(password.hash).to.not.equal(password.salt);
            });
        });
    });

    describe('equals', () => {
        const password = hash('password', 'salt');
        describe('a Password object', () => {
            it('should equal an equally hashed password', () => {
                const password2 = hash('password', 'salt');
                expect(password.equals(password2)).to.equal(true);
            });
            it('should not equal an differently salted hashed password', () => {
                const password2 = hash('password', 'salted');
                expect(password.equals(password2)).to.equal(false);
            });
            it('should not equal an different hashed password', () => {
                const password2 = hash('password2', 'salt');
                expect(password.equals(password2)).to.equal(false);
            });
        });
        describe('a Password string', () => {
            it('should equal the same password', () => {
                expect(password.equals('password')).to.equal(true);
            });
            it('should not equal a different password', () => {
                const password2 = hash('password2', 'salt');
                expect(password.equals('password2')).to.equal(false);
            });
        });
    });
});
