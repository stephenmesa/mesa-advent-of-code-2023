import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day08-simple.txt').toString().split('\n');
const testInputPart2 = fs.readFileSync('inputs/day08-simple-part2.txt').toString().split('\n');
const testInput2 = fs.readFileSync('inputs/day08-simple2.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day08.mjs';

describe('Day 08', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 2);
    });
    it('Part 1 - Example 2', () => {
        const target = calc1(testInput2);
        assert.equal(target, 6);
    });
    it('Part 2', () => {
        const target = calc2(testInputPart2);
        assert.equal(target, 6);
    });
});
