import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day02-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
    calculateRoundPoints,
    calculateResultPoints,
} from '../day02.mjs';

describe('Day 02', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 15);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 12);
    });

    describe('CalculateRoundPoints(*)', () => {
        it('first', () => {
            const target = calculateRoundPoints('A Y');
            assert.equal(target, 8);
        });
        it('second', () => {
            const target = calculateRoundPoints('B X');
            assert.equal(target, 1);
        });
        it('third', () => {
            const target = calculateRoundPoints('C Z');
            assert.equal(target, 6);
        });
    });
    describe('calculateResultPoints()', () => {
        it('scenario 1', () => {
            const target = calculateResultPoints(3, 3);
            assert.equal(target, 3);
        });
    });
});
