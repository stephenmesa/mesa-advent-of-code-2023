import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day12-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day12.mjs';

describe.skip('Day 12', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 31);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, -1);
    });
});
