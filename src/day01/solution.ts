import { readInput } from '../utils';

export function parse(raw: string) {
    return raw.trim().split('\n');
}

const STARTING_DIAL_POS = 50;
const TOTAL_DIAL_POSITIONS = 100;

type Direction = 'L' | 'R';

type Rotation = {
    direction: Direction;
    distance: number;
};

export function getRotationInformation(instruction: string): Rotation {
    const direction = instruction[0];

    if (direction !== 'L' && direction !== 'R') {
        throw new Error(
            `Direction is not one of the two allowed values: ${direction}`,
        );
    }

    return {
        direction,
        distance: parseInt(instruction.split(direction)[1]),
    };
}

// In this problem, 130, 230, etc. all have the same "effective" distance of 30 (the hundredth place just puts you back where you started)
// Ex. Start 99 - 100 = 99, Start at 99 - 200 = 99
export function getEffectiveDistance(distance: number) {
    return distance % TOTAL_DIAL_POSITIONS;
}

export function rotateRight(
    currentDialPosition: number,
    effectiveDistance: number,
) {
    const sum = currentDialPosition + effectiveDistance;

    if (sum > 99) {
        return sum - TOTAL_DIAL_POSITIONS;
    }

    return sum;
}

export function rotateLeft(
    currentDialPosition: number,
    effectiveDistance: number,
) {
    const difference = currentDialPosition - effectiveDistance;

    if (difference < 0) {
        return difference + TOTAL_DIAL_POSITIONS;
    }

    return difference;
}

export function solvePart1(raw: string) {
    const instructions = parse(raw);

    let currentDialPosition = STARTING_DIAL_POS;
    let timesLandedOnZero = 0;

    instructions.forEach((instruction) => {
        const { direction, distance } = getRotationInformation(instruction);
        const effectiveDistance = getEffectiveDistance(distance);

        if (direction === 'L') {
            currentDialPosition = rotateLeft(
                currentDialPosition,
                effectiveDistance,
            );
        } else {
            currentDialPosition = rotateRight(
                currentDialPosition,
                effectiveDistance,
            );
        }

        if (currentDialPosition === 0) {
            timesLandedOnZero++;
        }
    });

    return timesLandedOnZero;
}

export function solvePart2(raw: string) {
    const instructions = parse(raw);

    let currentDialPosition = STARTING_DIAL_POS;
    let timesLandedOnZero = 0;
    let timesCrossedZero = 0;

    instructions.forEach((instruction) => {
        const { direction, distance } = getRotationInformation(instruction);
        const effectiveDistance = getEffectiveDistance(distance);

        const dialPositionBeforeRotation = currentDialPosition;

        // Passed due to full revolution first
        let passedZero = Math.floor(distance / TOTAL_DIAL_POSITIONS);

        if (direction === 'L') {
            const absoluteDifference =
                dialPositionBeforeRotation - effectiveDistance;

            currentDialPosition = rotateLeft(
                currentDialPosition,
                effectiveDistance,
            );

            if (
                absoluteDifference < 0 &&
                currentDialPosition !== 0 &&
                dialPositionBeforeRotation !== 0
            ) {
                passedZero++;
            }
        } else {
            const absoluteSum = dialPositionBeforeRotation + effectiveDistance;

            currentDialPosition = rotateRight(
                currentDialPosition,
                effectiveDistance,
            );

            if (
                absoluteSum > 99 &&
                currentDialPosition !== 0 &&
                dialPositionBeforeRotation !== 0
            ) {
                passedZero++;
            }
        }

        if (currentDialPosition === 0) {
            timesLandedOnZero++;
        }

        timesCrossedZero += passedZero;
    });

    return timesLandedOnZero + timesCrossedZero;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);

    // How many times does a rotation land on 0?
    console.log(`Part One: ${solvePart1(raw)}`);

    // How many times does a rotation click through OR land on 0 - messy, could make clearer, think it's way overcomplicated
    console.log(`Part Two: ${solvePart2(raw)}`);
}

/**
 * Notes:
 *
 */
