import { readInput } from '../utils';

export function parse(raw: string) {
    return raw.trim().split('\n');
}

type Direction = 'L' | 'R';

type Rotation = {
    direction: Direction;
    distance: number;
};

export function getRotationInformation(instruction: string): Rotation {
    const direction = instruction[0];

    if (direction !== 'L' && direction !== 'R') {
        throw new Error('Direction is not one of the two allowed values');
    }

    return {
        direction,
        distance: parseInt(instruction.split(direction)[1]),
    };
}

// In this problem, 130, 230, etc. all have the same "effective" distance of 30 (the hundredth place just puts you back where you started)
// Ex. Start 99 - 100 = 99, Start at 99 - 200 = 99
export function getEffectiveDistance(distance: number) {
    return distance % 100;
}

export function rotateRight(
    currentDialPosition: number,
    effectiveDistance: number,
) {
    const sum = currentDialPosition + effectiveDistance;

    if (sum > 99) {
        return sum - 100;
    }

    return sum;
}

export function rotateLeft(
    currentDialPosition: number,
    effectiveDistance: number,
) {
    const difference = currentDialPosition - effectiveDistance;

    if (difference < 0) {
        return difference + 100;
    }

    return difference;
}

export function solvePart1(raw: string) {
    const instructions = parse(raw);

    let currentDialPosition = 50;
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

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);
    console.log(solvePart1(raw));
}

/**
 * Notes:
 *
 * Dial starts at 50
 * left from 5 10 goes to 95
 */
