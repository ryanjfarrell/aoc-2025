import { readInput } from '../utils';

export function parse(raw: string) {
    return raw.trim().split('\n');
}

export function findMaxJoltageInBank(bank: string, digits: number) {
    let maxJoltage = '';

    let indexToStartAt = 0;

    for (let i = 0; i < digits; i++) {
        // Ex. First time through we will be filling 1 slot of 12
        // 12 - 0 - 1 = 11 (we need to fill 11 more slots after)
        const digitsRequiredAfter = digits - i - 1;

        // Ex. If bank.length = 15, 15 - 11 = 4
        // 4 is the index we must stop BEFORE
        // 8181 81911112111 , last check will be second 1, because there are 11 digits after
        const indexWeMustStopBefore = bank.length - digitsRequiredAfter;

        let highestDigit = 0;
        let indexOfHighestDigit = 0;

        for (let j = indexToStartAt; j < indexWeMustStopBefore; j++) {
            const digitToCheck = parseInt(bank[j]);

            if (digitToCheck > highestDigit) {
                highestDigit = digitToCheck;
                indexOfHighestDigit = j;
            }

            if (j === indexWeMustStopBefore - 1) {
                maxJoltage += highestDigit;
                indexToStartAt = indexOfHighestDigit + 1;
            }
        }
    }

    return parseInt(maxJoltage);
}

export function solve(raw: string, digits: number) {
    const batteryBanks = parse(raw);

    const totalJoltage = batteryBanks.reduce((acc, bank) => {
        const maxJoltage = findMaxJoltageInBank(bank, digits);

        return acc + maxJoltage;
    }, 0);

    return totalJoltage;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);

    console.log(`Day 3, Part 1, Max Joltage: ${solve(raw, 2)}`);
    console.log(`Day 3, Part 2, Max Joltage: ${solve(raw, 12)}`);
}
