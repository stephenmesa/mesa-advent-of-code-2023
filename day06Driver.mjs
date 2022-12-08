import fs from 'fs';

const input = fs.readFileSync('inputs/day06.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day06.mjs';

console.log('Day 06 - Part 1', calc1(input));
console.log('Day 06 - Part 2', calc2(input));
