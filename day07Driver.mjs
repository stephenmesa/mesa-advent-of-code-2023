import fs from 'fs';

const input = fs.readFileSync('inputs/day07.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day07.mjs';

console.log('Day 07 - Part 1', calc1(input));
console.log('Day 07 - Part 2', calc2(input));
