import { readInput } from '../utils';

export function parse(raw: string) {
    return raw.trim().split('\n');
}

export function solve() {
    console.log('blah');
    return 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const raw = readInput(__dirname);
    const parsed = parse(raw);
}
