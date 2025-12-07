import { expect, test } from 'vitest';
import { solve, parse, solveP2 } from './solution';

const raw = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   + 
`;

const problems = parse(raw);

const { numbers, operation } = problems[0];

test('Parsed operation', () => {
    expect(operation).toEqual('*');
});

test('Parsed numbers', () => {
    expect(numbers).toEqual([123, 45, 6]);
});

test('Solve sample', () => {
    expect(solve(raw).p1).toEqual(4277556);
});

test('Solve sample P2', () => {
    expect(solveP2(raw)).toEqual(3263827);
});
