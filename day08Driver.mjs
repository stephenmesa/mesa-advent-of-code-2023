import fs from 'fs';

const input = fs.readFileSync('inputs/day08.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day08.mjs';

console.log('Day 08 - Part 1', calc1(input));
console.log('Day 08 - Part 2', calc2(input));
