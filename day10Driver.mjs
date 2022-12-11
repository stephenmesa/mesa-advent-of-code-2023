import fs from 'fs';

const input = fs.readFileSync('inputs/day10.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day10.mjs';

console.log('Day 10 - Part 1', calc1(input));
console.log('Day 10 - Part 2');
console.log(calc2(input));
