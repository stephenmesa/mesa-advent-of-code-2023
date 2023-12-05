import fs from 'fs';

const input = fs.readFileSync('inputs/day05.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day05.mjs';

console.log('Day 05 - Part 1', calc1(input));
console.log('Day 05 - Part 2', calc2(input));
