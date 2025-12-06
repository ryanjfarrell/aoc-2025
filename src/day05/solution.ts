import { readInput } from '../utils';

export type Range = [number, number];

export function parse(raw: string) {
    const rowStrings = raw.trim().split('\n');

    const freshIdRanges: Range[] = [];
    const availableIngredients = [];

    let hitIngredients = false;

    for (const row of rowStrings) {
        if (row === '') {
            hitIngredients = true;
            continue;
        }

        if (hitIngredients) {
            availableIngredients.push(parseInt(row));
        } else {
            const [start, end] = row.split('-');

            freshIdRanges.push([parseInt(start), parseInt(end)]);
        }
    }

    return { freshIdRanges, availableIngredients };
}

// Sort to simplify range comparison and reduce cases of potential overlap
export function sortRangesAsc(ranges: Range[]) {
    return ranges.sort((a, b) => {
        const sortByStart = a[0] - b[0];

        // Same start
        if (sortByStart === 0) {
            return a[1] - b[1];
        }

        return sortByStart;
    });
}

export function eliminateRangeOverlaps(ranges: Range[]) {
    const cleanRanges: Range[] = [];

    const rangeCount = ranges.length;

    for (let i = 0; i < rangeCount; i++) {
        const currentRange = ranges[i];

        // At the end so just push
        if (i === rangeCount - 1) {
            cleanRanges.push(currentRange);
            break;
        }

        const [currStart, currEnd] = currentRange;

        const [nextStart, nextEnd] = ranges[i + 1];

        if (nextStart <= currEnd) {
            const newCurrEnd = nextStart - 1;

            // Create continuous join
            if (newCurrEnd >= currStart) {
                cleanRanges.push([currStart, newCurrEnd]);
            }

            // Don't lose the larger end
            if (currEnd > nextEnd) {
                ranges[i + 1] = [nextStart, currEnd];
            }
        } else {
            cleanRanges.push(currentRange);
        }
    }

    return cleanRanges;
}

export function countFreshIds(cleanRanges: Range[]) {
    return cleanRanges.reduce(
        (count, [start, end]) => count + end - start + 1,
        0,
    );
}

export function solve(raw: string) {
    const { freshIdRanges, availableIngredients } = parse(raw);

    const freshIds = availableIngredients.filter((id) =>
        freshIdRanges.find((range) => id >= range[0] && id <= range[1]),
    );

    // We need to construct new ranges that don't have duplicates across ranges
    const sortedRanges = sortRangesAsc(freshIdRanges);
    const cleanRanges = eliminateRangeOverlaps(sortedRanges);

    return { p1: freshIds.length, p2: countFreshIds(cleanRanges) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);

    const { p1, p2 } = solve(raw);
    console.log(`Day 5, Part 1, Fresh Ingredients: ${p1}`);
    console.log(`Day 5, Part 2, Fresh Ids: ${p2}`);
}

// Hit max memory and crashed
// const freshIdsP2 = new Set();

// for (const range of freshIdRanges) {
//     const [start, end] = range;

//     for (let id = start; id <= end; id++) {
//         if (!freshIdsP2.has(id)) {
//             freshIdsP2.add(id);
//         }
//     }
// }

// Numbers are way too big, will take ages, too many iterations
// const freshIdsP2: number[] = [];

// console.log(`Range count: ${freshIdRanges.length}`);
// let currentRange = 0;

// for (const range of freshIdRanges) {
//     console.log(`Iteration ${currentRange}`);

//     const [start, end] = range;

//     for (let id = start; id <= end; id++) {
//         if (!freshIdsP2.includes(id)) {
//             freshIdsP2.push(id);
//         }
//     }

//     currentRange++;
// }
