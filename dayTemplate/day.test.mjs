import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/dayX-simple.txt').toString().split('\n').map(Number);

import {
    calc1,
    calc2,
} from '../dayX.mjs';

describe('Day X', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, -1);
    });
    it.skip('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, -1);
    });
});
