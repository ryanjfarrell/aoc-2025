import { readInput } from '../utils';

export function parse(raw: string) {
    const rowStrings = raw.trim().split('\n');

    return {
        rowCount: rowStrings.length,
        columnCount: rowStrings[0].length,
        grid: rowStrings.map((r) => r.split('')),
    };
}

type WallInfo = ReturnType<typeof parse>;

const roll = '@';

// Col = x axis, Row = y axis
// Dumbest way possible, can't think of the mathy pattern that makes it more efficient
// Ignoring corners/sides won't save that much time for the code it adds
function getSurroundingCoords(
    [y, x]: [number, number],
    rowCount: number,
    colCount: number,
) {
    let checks: [number, number][] = [];

    const isCorner =
        (x === 0 || x === colCount - 1) && (y === 0 || y === rowCount - 1);
    if (isCorner) {
        return checks;
    }

    const notLeftSide = x !== 0;
    const notRightSide = x !== colCount - 1;
    const notTop = y !== 0;
    const notBottom = y !== rowCount - 1;

    if (notLeftSide) {
        checks.push([y, x - 1]); // Left

        if (notTop) {
            checks.push([y - 1, x - 1]); // Top-Left
        }
    }

    if (notRightSide) {
        checks.push([y, x + 1]); // Right

        if (notTop) {
            checks.push([y - 1, x + 1]); // Top-Right
        }
    }

    if (notTop) {
        checks.push([y - 1, x]); // Top
    }

    if (notBottom) {
        checks.push([y + 1, x]); // Bottom

        if (notLeftSide) {
            checks.push([y + 1, x - 1]); // Bottom-Left
        }

        if (notRightSide) {
            checks.push([y + 1, x + 1]); // Bottom-Right
        }
    }

    return checks;
}

export function isRollAccessible(
    { grid, rowCount, columnCount }: WallInfo,
    coords: [number, number],
) {
    let surroundingRolls = 0;
    let accessible = true;

    for (const [y, x] of getSurroundingCoords(coords, rowCount, columnCount)) {
        if (grid[y][x] === roll) {
            surroundingRolls++;
        }

        if (surroundingRolls >= 4) {
            accessible = false;
            break;
        }
    }

    return accessible;
}

export function solve(raw: string) {
    const info = parse(raw);

    const totalAccessibleRolls = info.grid.reduce((total, row, rowIndex) => {
        const rowTotal = row.reduce((t, spot, colIndex) => {
            if (spot === roll) {
                return isRollAccessible(info, [rowIndex, colIndex]) ? t + 1 : t;
            } else {
                return t;
            }
        }, 0);

        return total + rowTotal;
    }, 0);

    return { p1: totalAccessibleRolls };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);

    const { p1 } = solve(raw);

    console.log(`Day 4, Part 1, Accessible Rolls: ${p1}`);
}
