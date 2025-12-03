import { expect, test } from 'vitest';
import { findMaxJoltageInBank, solve } from './solution';

const s1 = '987654321111111';
const s2 = '811111111111119';
const s3 = '234234234234278';
const s4 = '818181911112111';

const samples = [s1, s2, s3, s4];

const samplesWithJoltage = [
    { bank: s1, j: 98 },
    { bank: s2, j: 89 },
    { bank: s3, j: 78 },
    { bank: s4, j: 92 },
];

test.each(samplesWithJoltage)(
    'Bank: %bank, expects max joltage of: %j',
    ({ bank, j }) => {
        expect(findMaxJoltageInBank(bank)).toEqual(j);
    },
);

const total = samplesWithJoltage.reduce((a, b) => a + b.j, 0);

test('Total joltage in sample', () =>
    expect(solve(samples.toString()).p1).toEqual(total));
