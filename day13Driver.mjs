import fs from 'fs';

const input = fs.readFileSync('inputs/day13.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day13.mjs';

console.log('Day 13 - Part 1', calc1(input));
console.log('Day 13 - Part 2', calc2(input));
