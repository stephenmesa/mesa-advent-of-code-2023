import fs from 'fs';

const input = fs.readFileSync('inputs/day12.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day12.mjs';

console.log('Day 12 - Part 1', calc1(input));
console.log('Day 12 - Part 2', calc2(input));
