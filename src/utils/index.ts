import fs from 'fs';
import path from 'path';

/**
 * Reads the "input.txt" file from the specific day's folder.
 * @param directory The __dirname of the day's solution file
 */
export function readInput(directory: string): string {
    const filePath = path.join(directory, 'input.txt');
    return fs.readFileSync(filePath, 'utf-8');
}
