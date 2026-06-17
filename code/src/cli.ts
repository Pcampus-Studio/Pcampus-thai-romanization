#!/usr/bin/env node
import { romanize } from './romanizer';
import { romanizeSentence } from './sentence';
import { reverseLookup } from './reverse';
import type { RomanizeOptions, SeparatorMode, ToneMode } from './types';

function printUsage(): void {
    console.log(`Usage: thai-romanize [options] <text>

Options:
  --sentence       Romanize full sentence (preserve spaces/punctuation)
  --reverse        Reverse lookup: Latin → Thai candidates
  --separator <s>  Syllable separator: "" | "-" | " " (default: "")
  --tone <mode>    Tone output: omit | diacritic | number (default: omit)
  -h, --help       Show this help
`);
}

function parseArgs(argv: string[]): {
    text: string;
    sentence: boolean;
    reverse: boolean;
    options: RomanizeOptions;
} | null {
    const args = [...argv];
    let sentence = false;
    let reverse = false;
    const options: RomanizeOptions = {};
    const positional: string[] = [];

    while (args.length > 0) {
        const arg = args.shift()!;
        if (arg === '-h' || arg === '--help') {
            printUsage();
            return null;
        }
        if (arg === '--sentence') {
            sentence = true;
            continue;
        }
        if (arg === '--reverse') {
            reverse = true;
            continue;
        }
        if (arg === '--separator') {
            const value = args.shift();
            if (value === undefined) throw new Error('Missing value for --separator');
            options.separator = value as SeparatorMode;
            continue;
        }
        if (arg === '--tone') {
            const value = args.shift();
            if (value === undefined) throw new Error('Missing value for --tone');
            options.tone = value as ToneMode;
            continue;
        }
        positional.push(arg);
    }

    const text = positional.join(' ').trim();
    if (!text) {
        printUsage();
        process.exit(1);
    }

    return { text, sentence, reverse, options };
}

function main(): void {
    try {
        const parsed = parseArgs(process.argv.slice(2));
        if (!parsed) return;

        const { text, sentence, reverse, options } = parsed;

        if (reverse) {
            const matches = reverseLookup(text);
            if (matches.length === 0) {
                console.log('(no matches)');
            } else {
                console.log(matches.join('\n'));
            }
            return;
        }

        const result = sentence ? romanizeSentence(text, options) : romanize(text, options);
        console.log(result);
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(message);
        process.exit(1);
    }
}

main();
