import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day07-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day07.mjs';

describe('Day 07', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 95437);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 24933642);
    });
});
