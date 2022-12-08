import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day01-simple.txt').toString().split('\n').map(Number);

import {
    calc1,
    calc2,
    calculateSums,
} from '../day01.mjs';

describe('Day 01', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 24000);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 45000);
    });

    it('CalculateSums()', () => {
        const target = calculateSums(testInput);
        assert.deepEqual(target, [6000,4000,11000,24000,10000]);
    });
});
