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

export function isInvalidId({ strLength, strFormat }: ProductIdInfo) {
    if (!isEvenlyDivisibleByTwo(strLength)) {
        return false;
    }

    const [part1, part2] = splitStringAtIndex(strFormat, strLength / 2);

    return part1 === part2;
}

export function getInvalidIdsInRange({
    start,
    end,
}: Range): [number[], number] {
    const invalidIds = [];
    let sumOfInvalidIds = 0;

    for (let i = start; i <= end; i++) {
        if (isInvalidId(getProductIdInfo(i))) {
            sumOfInvalidIds += i;
            invalidIds.push(i);
        }
    }

    return [invalidIds, sumOfInvalidIds];
}

export function solve(raw: string) {
    const productIdRanges = parse(raw).map((r) => buildRange(r));

    const [_, sumOfInvalidIds] = productIdRanges.reduce(
        ([invalid, sum]: [number[], number], range) => {
            const [invalidIdsInRange, sumOfIdsInRange] =
                getInvalidIdsInRange(range);

            return [[...invalid, ...invalidIdsInRange], sum + sumOfIdsInRange];
        },
        [[], 0],
    );

    return { part1Solution: sumOfInvalidIds };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);

    // Assuming only Ids that contain 2 repeating components and nothing else, sum invalid Ids in ranges
    const { part1Solution } = solve(raw);
    console.log(`Day 2, Part 1: ${part1Solution}`);

    // How many times does a rotation click through OR land on 0 - messy, could make clearer, think it's way overcomplicated
    // console.log(`Day 2, Part Two: ${solvePart2(raw)}`);
}

/**
 * Notes
 *
 */
