import fs from 'fs';

const input = fs.readFileSync('inputs/day09.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day09.mjs';

console.log('Day 09 - Part 1', calc1(input));
console.log('Day 09 - Part 2', calc2(input));
