import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day06-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day06.mjs';

describe('Day 06', () => {
    describe('Part 1', () => {
        it('main case', () => {
            const target = calc1(testInput);
            assert.equal(target, 7);
        });
        it('case 2', () => {
            const target = calc1(['bvwbjplbgvbhsrlpgdmjqwftvncz']);
            assert.equal(target, 5);
        });
        it('case 3', () => {
            const target = calc1(['nppdvjthqldpwncqszvftbrmjlhg']);
            assert.equal(target, 6);
        });
        it('case 4', () => {
            const target = calc1(['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg']);
            assert.equal(target, 10);
        });
        it('case 5', () => {
            const target = calc1(['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw']);
            assert.equal(target, 11);
        });
    });
    describe('Part 2', () => {
        it('main case', () => {
            const target = calc2(testInput);
            assert.equal(target, 19);
        });
        it('case 2', () => {
            const target = calc2(['bvwbjplbgvbhsrlpgdmjqwftvncz']);
            assert.equal(target, 23);
        });
        it('case 3', () => {
            const target = calc2(['nppdvjthqldpwncqszvftbrmjlhg']);
            assert.equal(target, 23);
        });
        it('case 4', () => {
            const target = calc2(['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg']);
            assert.equal(target, 29);
        });
        it('case 5', () => {
            const target = calc2(['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw']);
            assert.equal(target, 26);
        });
    });
});
