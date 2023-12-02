import fs from 'fs';

const input = fs.readFileSync('inputs/day02.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day02.mjs';

console.log('Day 02 - Part 1', calc1(input));
console.log('Day 02 - Part 2', calc2(input));
