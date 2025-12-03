import { readInput } from '../utils';

export function parse(raw: string) {
    return raw.trim().split('\n');
}

export function findMaxJoltageInBank(bank: string) {
    const batteryCount = bank.length;
    const lastBatteryIndex = batteryCount - 1;

    let first = bank[0];
    let second = bank[1];

    for (let i = 1; i <= lastBatteryIndex; i++) {
        const currentBatteryDigitStr = bank[i];
        const currentBatteryDigitParsed = parseInt(currentBatteryDigitStr);

        if (
            currentBatteryDigitParsed > parseInt(first) &&
            i !== lastBatteryIndex
        ) {
            first = currentBatteryDigitStr;
            second = bank[i + 1];
            continue;
        }

        if (currentBatteryDigitParsed > parseInt(second)) {
            second = currentBatteryDigitStr;
        }
    }

    return parseInt(first + second);
}

export function solve(raw: string) {
    const batteryBanks = parse(raw);

    const totalJoltage = batteryBanks.reduce((acc, bank) => {
        const maxJoltage = findMaxJoltageInBank(bank);

        return acc + maxJoltage;
    }, 0);

    return { p1: totalJoltage, p2: 0 };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);

    console.log(`Day 3, Part 1, Max Joltage: ${solve(raw).p1}`);
}
