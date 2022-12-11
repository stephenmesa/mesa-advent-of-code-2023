import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day10-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day10.mjs';

describe('Day 10', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 13140);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.deepEqual(target, `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`);
    });
});
