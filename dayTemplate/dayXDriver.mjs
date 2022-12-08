import fs from 'fs';

const input = fs.readFileSync('inputs/day01.txt').toString().split('\n').map(Number);

import {
    calc1,
    calc2,
} from './dayX.mjs';

console.log('Day X - Part 1', calc1(input));
console.log('Day X - Part 2', calc2(input));
