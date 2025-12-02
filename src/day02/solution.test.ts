import { expect, test } from 'vitest';
import {
    parse,
    solve,
    buildRange,
    getInvalidIdsInRange,
    isInvalidIdForPartTwo,
    getProductIdInfo,
} from './solution';

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
    expect(getInvalidIdsInRange(expectedFirstRange).p1).toEqual([[11, 22], 33]);
});

test('Solve for sample data', () => {
    expect(solve(rawInput).part1Solution).toEqual(1227775554);
});

const invalidIds = [
    12341234, 123123123, 1212121212, 1111111, 2121212121, 824824824, 565656,
    38593859, 446446, 222222, 11, 22, 99, 111, 999, 1010, 1188511885,
];

// Part 2
test.each(invalidIds)(`Expect ID: %i to be invalid`, (id) => {
    expect(isInvalidIdForPartTwo(getProductIdInfo(id))).toBeTruthy();
});

const validIds = [1698528];

test.each(validIds)('Expect ID: %i', (id) => {
    expect(isInvalidIdForPartTwo(getProductIdInfo(id))).toBeFalsy();
});

test('Solve for sample data, part 2', () => {
    expect(solve(rawInput).part2Solution).toEqual(4174379265);
});
