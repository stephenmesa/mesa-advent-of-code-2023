import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day03-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
    discoverNumber,
} from '../day03.mjs';

describe('Day 03', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 4361);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 467835);
    });
    describe('discoverNumber()', () => {
        it('test 1', () => {
            const target = discoverNumber(3, '..1234...');
            assert.deepEqual(target, { num: 1234, startIndex: 2, endIndex: 5 });
        });
        it('test 2', () => {
            const target = discoverNumber(2, '1234...');
            assert.deepEqual(target, { num: 1234, startIndex: 0, endIndex: 3 });
        });
        it('test 3', () => {
            const target = discoverNumber(3, '..1234');
            assert.deepEqual(target, { num: 1234, startIndex: 2, endIndex: 5 });
        });
        it('test 4', () => {
            const target = discoverNumber(8, '..1234..56.');
            assert.deepEqual(target, { num: 56, startIndex: 8, endIndex: 9 });
        });
        it('test 5', () => {
            const target = discoverNumber(1, '..1234..56.');
            assert.equal(target, null);
        });
    });
});
