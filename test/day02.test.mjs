import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day02-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day02.mjs';

describe('Day 02', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 8);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 2286);
    });
});
