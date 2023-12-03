import fs from 'fs';

const input = fs.readFileSync('inputs/day03.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day03.mjs';

console.log('Day 03 - Part 1', calc1(input));
console.log('Day 03 - Part 2', calc2(input));
