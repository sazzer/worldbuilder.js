import {expect} from 'chai';

describe('Array', () => {
    const array = [1, 2, 3];
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            expect(array.indexOf(5)).to.equal(-1);
            expect(array.indexOf(0)).to.equal(-1);
        });
    });
});
