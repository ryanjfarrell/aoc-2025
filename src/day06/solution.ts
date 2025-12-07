import { readInput } from '../utils';

type Operation = '*' | '+';

type Problem = {
    operation: Operation;
    numbers: number[];
};

export function parse(raw: string) {
    const rows = raw.trim().split('\n');
    const cleanRows = rows.map((r) => r.split(' ').filter((rr) => rr !== ''));

    const numberRows = cleanRows.slice(0, cleanRows.length - 1);
    const symbolRow = cleanRows[cleanRows.length - 1];

    const problems: Problem[] = [];

    for (let colIndex = 0; colIndex < symbolRow.length; colIndex++) {
        problems.push({
            numbers: numberRows.map((r) => parseInt(r[colIndex])),
            operation: symbolRow[colIndex] as Operation,
        });
    }

    return problems;
}

export function parseP2(raw: string) {
    const rows = raw.split('\n');

    return rows;
}

export function performOperation(num1: number, num2: number, op: Operation) {
    if (op === '*') {
        return num1 * num2;
    }

    return num1 + num2;
}

export function solveP2(raw: string) {
    const rows = parseP2(raw);

    let total = 0;

    let currentTotal: number | null = null;
    let operation: Operation | '' = '';

    const symbolIndex = rows.length - 1;

    console.log(`Row count: ${rows.length}`);

    rows.forEach((r) => {
        console.log(`Row length: ${r.length}`);
    });

    const maxRowLength = Math.max(...rows.map((r) => r.length));

    for (let colI = 0; colI < maxRowLength; colI++) {
        let currentNumber = '';

        const operationSpot = rows[symbolIndex][colI];

        if (operationSpot !== ' ') {
            operation = operationSpot as Operation;
        }

        for (let rI = 0; rI < symbolIndex; rI++) {
            const spot = rows[rI][colI];

            if (spot !== ' ') {
                currentNumber = `${currentNumber}${spot}`;
            }
        }

        if (operation !== '' && currentNumber !== '') {
            const num = parseInt(currentNumber);

            if (currentTotal === null) {
                currentTotal = num;
            } else {
                currentTotal = performOperation(currentTotal, num, operation);
            }
        }

        // No numbers, no operation, end of problem
        if (
            (currentNumber === '' && operationSpot === ' ') ||
            colI === maxRowLength - 1
        ) {
            if (currentTotal !== null) {
                total += currentTotal;
                currentTotal = null;
            }
        }
    }

    return total;
}

export function solve(raw: string) {
    const problems = parse(raw);

    let totalP1 = 0;
    let currentVal: number;

    problems.forEach(({ numbers, operation }) => {
        if (!currentVal) {
            currentVal = operation === '+' ? 0 : 1;
        }

        for (let i = 0; i < numbers.length; i++) {
            currentVal = performOperation(currentVal, numbers[i], operation);
        }

        totalP1 += currentVal;
        currentVal = 0;
    });

    return { p1: totalP1 };
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);

    const { p1 } = solve(raw);
    const p2 = solveP2(raw);
    console.log(`Day 6, Part 1, Total: ${p1}`);
    console.log(`Day 6, Part 2, Total: ${p2}`);
}
