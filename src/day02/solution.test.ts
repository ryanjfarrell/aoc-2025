import { expect, test } from 'vitest';
import { parse, solve, buildRange, getInvalidIdsInRange } from './solution';

const rawInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

const parsed = parse(rawInput);

test('Parsing first as 11-22, last as 2121212118-2121212124', () => {
    expect(parsed[0]).toBe('11-22');
    expect(parsed[parsed.length - 1]).toBe('2121212118-2121212124');
});

const expectedFirstRange = { start: 11, end: 22 };

test('Build range from 11-22', () => {
    expect(buildRange('11-22')).toEqual(expectedFirstRange);
});

test('Find invalid ids in single ranges', () => {
    expect(getInvalidIdsInRange(expectedFirstRange)).toEqual([[11, 22], 33]);
});

test('Solve for sample data', () => {
    expect(solve(rawInput).part1Solution).toEqual(1227775554);
});
