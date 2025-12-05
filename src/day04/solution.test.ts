import { expect, test } from 'vitest';
import { solve, parse } from './solution';

const raw = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;

const { rowCount, columnCount, grid } = parse(raw);

test('Row count is 10', () => {
    expect(rowCount).toEqual(10);
    expect(grid.length).toEqual(10);
});

test('Column count is 10', () => {
    expect(columnCount).toEqual(10);
    expect(grid[0].length).toEqual(10);
});

test('[0][0] is .', () => expect(grid[0][0]).toEqual('.'));

test('[1][0] is @', () => expect(grid[1][0]).toEqual('@'));

const stringGrid = `[[".",".","@","@",".","@","@","@","@","."]]`;

test(`String of first row`, () =>
    expect(JSON.stringify(grid.slice(0, 1))).toEqual(stringGrid));

test('Total rolls removed in p2 sample is ', () =>
    expect(solve(raw, 2).p2).toEqual(43));

// [0,0] - [0,1],[1,0],[1,1]
// [0,1] - [0,0],[1,0],[1,1],[0,2],[1,2]
// [1,0] - [0,0],[0,1],[1,1],[2,0],[2,1]

// [9,9] - [9,8],[8,8],[8,9]
