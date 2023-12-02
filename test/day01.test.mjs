import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day01-part1-simple.txt').toString().split('\n');
const testPart2Input = fs.readFileSync('inputs/day01-part2-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day01.mjs';

describe('Day 01', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 142);
    });

    it('Second problem', () => {
        const target = calc2(testPart2Input);
        assert.equal(target, 281);
    });
});
