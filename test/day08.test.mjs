import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day08-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day08.mjs';

describe('Day 08', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 21);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 8);
    });
});
