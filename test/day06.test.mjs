import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day06-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day06.mjs';

describe('Day 06', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 288);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 71503);
    });
});
