import { expect, test } from 'vitest';
import { findMaxJoltageInBank, solve, parse } from './solution';

const raw = `
987654321111111
811111111111119
234234234234278
818181911112111
`;

const parsed = parse(raw);

const s1 = parsed[0];
const s2 = parsed[1];
const s3 = parsed[2];
const s4 = parsed[3];

const samplesWithJoltage = [
    { bank: s1, j: 98 },
    { bank: s2, j: 89 },
    { bank: s3, j: 78 },
    { bank: s4, j: 92 },
];

test.each(samplesWithJoltage)(
    'Bank: %bank, expects max joltage of: %j',
    ({ bank, j }) => {
        expect(findMaxJoltageInBank(bank, 2)).toEqual(j);
    },
);

const total = samplesWithJoltage.reduce((a, b) => a + b.j, 0);

test('Total joltage in sample', () => expect(solve(raw, 2)).toEqual(total));

const samplesWithJoltageP2 = [
    { bank: s1, j: 987654321111 },
    { bank: s2, j: 811111111119 },
    { bank: s3, j: 434234234278 },
    { bank: s4, j: 888911112111 },
];

test.each(samplesWithJoltageP2)(
    'P2 bank: %bank, expects max joltage of: %j',
    ({ bank, j }) => {
        expect(findMaxJoltageInBank(bank, 12)).toEqual(j);
    },
);

const totalP2 = samplesWithJoltageP2.reduce((a, b) => a + b.j, 0);

test('P2 Total joltage in sample', () =>
    expect(solve(raw, 12)).toEqual(totalP2));
