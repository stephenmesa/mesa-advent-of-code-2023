import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day11-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day11.mjs';

describe('Day 11', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 10605);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 2713310158);
    });
});
