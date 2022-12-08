import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day04-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day04.mjs';

describe('Day 04', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 2);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 4);
    });
});
