import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day10-simple.txt').toString().split('\n');
const testInput2 = fs.readFileSync('inputs/day10-simple2.txt').toString().split('\n');
const testInput3 = fs.readFileSync('inputs/day10-simple3.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day10.mjs';

describe('Day 10', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 4);
    });
    it('Part 1 - 2', () => {
        const target = calc1(testInput2);
        assert.equal(target, 8);
    });
    it('Part 1 - 3', () => {
        const target = calc1(testInput3);
        assert.equal(target, 4);
    });
    it.skip('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, -1);
    });
});
