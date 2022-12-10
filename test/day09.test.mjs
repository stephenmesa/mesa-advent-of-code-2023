import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day09-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
    getNewTailCoordinates,
} from '../day09.mjs';

describe('Day 09', () => {
    describe('getNewTailCoordinates()', () => {
        it('case 1', () => {
            const target = getNewTailCoordinates({x: 4, y: 1}, {x: 2, y: 0}, 'u');
            assert.deepEqual(target, { x: 3, y: 1});
        });
    });
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 13);
    });
    describe('Part 2', () => {
        it('First example', () => {
            const target = calc2(testInput);
            assert.equal(target, 1);
        });
        it('Second example', () => {
            const newTestInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.split(('\n'));
            const target = calc2(newTestInput);
            assert.equal(target, 36);
        });
    });
});
