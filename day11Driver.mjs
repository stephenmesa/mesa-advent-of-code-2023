import fs from 'fs';

const input = fs.readFileSync('inputs/day11.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day11.mjs';

console.log('Day 11 - Part 1', calc1(input));
console.log('Day 11 - Part 2', calc2(input));
