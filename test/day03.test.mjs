import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    getPriority,
} from '../day03.mjs';

const testInput = fs.readFileSync('inputs/day03-simple.txt').toString().split('\n');

describe('Day 03', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 157);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 70);
    });
    describe('getPriority()', () => {
        it('a', () => {
            const target = getPriority('a');
            assert.equal(target, 1);
        });
        it('z', () => {
            const target = getPriority('z');
            assert.equal(target, 26);
        });
        it('A', () => {
            const target = getPriority('A');
            assert.equal(target, 27);
        });
        it('Z', () => {
            const target = getPriority('Z');
            assert.equal(target, 52);
        });
    });
});
