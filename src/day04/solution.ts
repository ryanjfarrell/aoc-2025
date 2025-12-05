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

type Coords = [number, number];

const roll = '@';

function getSurroundingCoords(
    [y, x]: Coords,
    rowCount: number,
    colCount: number,
) {
    let checks: Coords[] = [];

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
    coords: Coords,
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

export function getAccessibleRolls(
    info: WallInfo,
    currentlyAccessibleCoords: Coords[],
) {
    for (let y = 0; y < info.rowCount; y++) {
        for (let x = 0; x < info.columnCount; x++) {
            const spot = info.grid[y][x];

            if (spot === roll) {
                const coordsToCheck: Coords = [y, x];
                const accessible = isRollAccessible(info, coordsToCheck);

                if (accessible) {
                    currentlyAccessibleCoords.push(coordsToCheck);
                }
            }
        }
    }
}

export function removeAccessibleRolls(info: WallInfo, rollsToRemove: Coords[]) {
    for (const [y, x] of rollsToRemove) {
        info.grid[y][x] = '.';
    }
}

export function solve(raw: string, part: 1 | 2) {
    let info = parse(raw);
    let currentlyAccessibleCoords: Coords[] = [];
    let accessibleRollsStillExist = true;
    let totalRemoved = 0;

    while (accessibleRollsStillExist) {
        getAccessibleRolls(info, currentlyAccessibleCoords);

        console.log(
            `Currently accessible rolls: ${currentlyAccessibleCoords.length}`,
        );

        const rollsToRemoveThisRound = currentlyAccessibleCoords.length;

        if (rollsToRemoveThisRound === 0 || part === 1) {
            accessibleRollsStillExist = false;
            break;
        }

        if (part === 2) {
            totalRemoved += rollsToRemoveThisRound;
            removeAccessibleRolls(info, currentlyAccessibleCoords);
            console.log(`Total removed so far: ${totalRemoved}\n----`);
            currentlyAccessibleCoords = [];
        }
    }

    return { p1: currentlyAccessibleCoords.length, p2: totalRemoved };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);

    console.log(`Day 4, Part 1, Accessible Rolls: ${solve(raw, 1).p1}`);
    console.log(`Day 4, Part 2, Total Rolls Removed: ${solve(raw, 2).p2}`);
}
