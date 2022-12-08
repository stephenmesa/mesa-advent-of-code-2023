import fs from 'fs';

const input = fs.readFileSync('inputs/day04.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day04.mjs';

console.log('Day 04 - Part 1', calc1(input));
console.log('Day 04 - Part 2', calc2(input));
