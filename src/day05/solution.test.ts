import { expect, test } from 'vitest';
import { solve, parse, sortRangesAsc, countFreshIds, Range } from './solution';

const raw = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;

const { freshIdRanges, availableIngredients } = parse(raw);

test('First range is from 3 to 5', () =>
    expect(freshIdRanges[0]).toEqual([3, 5]));

test('Last range is from 12 to 18', () =>
    expect(freshIdRanges[freshIdRanges.length - 1]).toEqual([12, 18]));

test('First ingredient id is 1', () =>
    expect(availableIngredients[0]).toEqual(1));

test('Last ingredient id is 32', () =>
    expect(availableIngredients[availableIngredients.length - 1]).toEqual(32));

test('3 fresh ingredients in sample', () => expect(solve(raw).p1).toEqual(3));

test('14 fresh ids in sample', () => expect(solve(raw).p2).toEqual(14));

const raw2 = `
1-200
4-8



1
5
8
11
17
32
`;

test('fresh ids in sample with extras', () =>
    expect(solve(raw2).p2).toEqual(200));

const raw3 = `
1-200
4-800



1
5
8
11
17
32
`;

test('fresh ids in sample with extras', () =>
    expect(solve(raw3).p2).toEqual(800));

const sortedSampleRanges = [
    [3, 5],
    [10, 14],
    [12, 18],
    [16, 20],
];

test('Sorted ranges', () =>
    expect(sortRangesAsc(freshIdRanges)).toEqual(sortedSampleRanges));

// Case 1 - No overlap - next start > current end
const overlapCaseOne: Range[] = [
    [3, 5],
    [10, 14],
];

test('c1, count', () => expect(countFreshIds(overlapCaseOne)).toEqual(8));

// Think a bunch of my notes are no longer useful as I simplified things...

// Case 2 - Next start is same as current, next end is greater than current end
// Solution, bump next start to be 1 more than current end
const overlapCaseTwo: Range[] = [
    [3, 5],
    [3, 14],
];

// Case 3 - Next start > current start, but next start = current end
const overlapCaseThree: Range[] = [
    [3, 5],
    [5, 14],
];

// Case 4 - Next start > current start, but next start < current end
const overlapCaseFour: Range[] = [
    [3, 5],
    [4, 14],
];

// Case 2, 3, 4 all have the same solution, reduce end of current until it's 1 less than
// next start, and if this causes it to equal current start, just continue and don't push
const cleanCaseTwo: Range[] = [
    [3, 5],
    [6, 14],
];

// Case 5 - Full overlap
// push current to clean
// At the start of each range comparison we can check the previous (if i > 0) and if it's the same, break
const overlapCaseFive: Range[] = [
    [3, 5],
    [3, 5],
];

const c = [[3, 6], [3, 5], []];
