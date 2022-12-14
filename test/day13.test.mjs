import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day13-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day13.mjs';

describe('Day 13', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 13);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 140);
    });
});
