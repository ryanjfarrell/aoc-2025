import { expect, test } from 'vitest';
import { solve, parse } from './solution';

const rawInput = `
L3
R49
`;

test('Parsing first as L3, second as R49', () => {
    expect(parse(rawInput)[0]).toBe('L3');
    expect(parse(rawInput)[1]).toBe('R49');
});
