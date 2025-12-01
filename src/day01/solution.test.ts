import { expect, test } from 'vitest';
import {
    solvePart1,
    parse,
    getRotationInformation,
    rotateRight,
    rotateLeft,
} from './solution';

const rawInput = `
L3
R49
`;

test('Parsing first as L3, second as R49', () => {
    expect(parse(rawInput)[0]).toBe('L3');
    expect(parse(rawInput)[1]).toBe('R49');
});

const firstInstruction = parse(rawInput)[0];
const secondInstruction = parse(rawInput)[1];

test('Test rotation information function', () => {
    expect(getRotationInformation(firstInstruction)).toEqual({
        direction: 'L',
        distance: 3,
    });
    expect(getRotationInformation(secondInstruction)).toEqual({
        direction: 'R',
        distance: 49,
    });
});

test('Rotate right past 99 one to 0', () => {
    expect(rotateRight(99, 1)).toEqual(0);
});

test('Rotate left past 0 one to 99', () => {
    expect(rotateLeft(0, 1)).toEqual(99);
});

const rawProvided = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`;

test('Sample provided, 3 times at 0', () => {
    expect(solvePart1(rawProvided)).toEqual(3);
});
