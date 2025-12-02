import { readInput } from '../utils';

export function parse(raw: string) {
    return raw.trim().split(',');
}

export function solve(raw: string) {}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);
}
