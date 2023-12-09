import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day09-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day09.mjs';

describe('Day 09', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 114);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 2);
    });
});
