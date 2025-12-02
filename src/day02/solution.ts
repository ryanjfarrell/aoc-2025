import { readInput } from '../utils';

export function parse(raw: string) {
    return raw.trim().split(',');
}

type Range = {
    start: number;
    end: number;
};

type ProductIdInfo = {
    numFormat: number;
    strFormat: string;
    strLength: number;
};

export function buildRange(raw: string): Range {
    const splitRawString = raw.split('-');

    return {
        start: parseInt(splitRawString[0]),
        end: parseInt(splitRawString[1]),
    };
}

export function getProductIdInfo(numFormat: number): ProductIdInfo {
    const strFormat = numFormat.toString();
    const strLength = strFormat.length;
    return {
        numFormat,
        strFormat,
        strLength,
    };
}

export function isEvenlyDivisibleByTwo(num: number) {
    return num % 2 === 0;
}

export function splitStringAtIndex(str: string, index: number) {
    const part1 = str.slice(0, index);
    const part2 = str.slice(index);
    return [part1, part2];
}

export function isInvalidIdForPartOne({ strLength, strFormat }: ProductIdInfo) {
    if (!isEvenlyDivisibleByTwo(strLength)) {
        return false;
    }

    const [part1, part2] = splitStringAtIndex(strFormat, strLength / 2);

    return part1 === part2;
}

export function isInvalidIdForPartTwo({ strFormat, strLength }: ProductIdInfo) {
    let invalid = false;

    for (let parts = 2; parts <= strLength; parts++) {
        if (strLength % parts === 0) {
            const partLength = strLength / parts;
            const components = strFormat.split(strFormat.slice(0, partLength));

            if (components.join('') === '') {
                invalid = true;
                break;
            }
        }
    }

    return invalid;
}

type Solution = {
    p1: [number[], number];
    p2: [number[], number];
};

export function getInvalidIdsInRange({ start, end }: Range): Solution {
    const invalidIdsPartOne = [];
    let sumOfInvalidIdsPartOne = 0;

    const invalidIdsPartTwo = [];
    let sumOfInvalidIdsPartTwo = 0;

    for (let i = start; i <= end; i++) {
        const idInfo = getProductIdInfo(i);

        if (isInvalidIdForPartOne(idInfo)) {
            sumOfInvalidIdsPartOne += i;
            invalidIdsPartOne.push(i);
        }

        if (isInvalidIdForPartTwo(idInfo)) {
            sumOfInvalidIdsPartTwo += i;
            invalidIdsPartTwo.push(i);
        }
    }

    return {
        p1: [invalidIdsPartOne, sumOfInvalidIdsPartOne],
        p2: [invalidIdsPartTwo, sumOfInvalidIdsPartTwo],
    };
}

export function solve(raw: string) {
    const productIdRanges = parse(raw).map((r) => buildRange(r));

    const {
        p1: [_, part1Solution],
        p2: [__, part2Solution],
    } = productIdRanges.reduce(
        (acc: Solution, range) => {
            const { p1, p2 } = getInvalidIdsInRange(range);

            acc.p1[0].push(...p1[0]);
            acc.p1[1] += p1[1];

            acc.p2[0].push(...p2[0]);
            acc.p2[1] += p2[1];

            return acc;
        },
        { p1: [[], 0], p2: [[], 0] },
    );

    return { part1Solution, part2Solution };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);

    // Assuming only Ids that contain 2 repeating components and nothing else, sum invalid Ids in ranges
    const { part1Solution, part2Solution } = solve(raw);
    console.log(`Day 2, Part 1: ${part1Solution}`);

    // Invalid Ids can contain repetitions (and only repetitions) of any length, sum invalid
    console.log(`Day 2, Part 2: ${part2Solution}`);
}
