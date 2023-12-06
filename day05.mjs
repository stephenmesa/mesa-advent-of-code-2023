const parseMap = (lines) => {
    const titleMatch = lines[0].match(/(\w+)-to-(\w+) map:/);
    const from = titleMatch[1];
    const to = titleMatch[2];

    const ranges = [];

    lines.slice(1).forEach(line => {
        const [
            destinationStart,
            sourceStart,
            rangeLength
        ] = line.split(' ').map(Number);
        ranges.push({
            destinationStart,
            sourceStart,
            rangeLength,
        });
    });

    return {
        from,
        to,
        ranges,
    };
};

const readLines = (input, index) => {
    let cursor = index;
    while (cursor < input.length && input[cursor] !== '') {
        cursor += 1;
    }

    return input.slice(index, cursor);
};

const parseInput = (input, part2 = false) => {
    const almanac = {
        conversions: {},
    };
    let lineIndex = 0;
    while (lineIndex < input.length) {
        const line = input[lineIndex];

        if (line === '') {
            lineIndex += 1;
            continue;
        }

        const seedsRegex = line.match(/seeds: ([\d ]+)+/);
        if (seedsRegex) {
            const seeds = seedsRegex[1].split(' ').map(Number);
            if (part2) {
                almanac.seeds = [];
                let seedIndex = 0;
                while (seedIndex < seeds.length) {
                    almanac.seeds.push({
                        start: seeds[seedIndex],
                        len: seeds[seedIndex + 1],
                    });
                    seedIndex += 2;
                }
            } else {
                almanac.seeds = seeds;
            }
            lineIndex += 1;
            continue;
        }

        if (line.endsWith('map:')) {
            const lines = readLines(input, lineIndex);
            const x = parseMap(lines);
            almanac.conversions[x.from] = x;
            lineIndex += lines.length;
            continue;
        } else {
            // Not sure what to do.... move on I guess?
            lineIndex += 1;
        }
    }

    return almanac;
};

const convertUnit = (num, conversion) => {
    const foundRange = conversion.ranges.find(r => num >= r.sourceStart && num <= r.sourceStart + r.rangeLength);
    if (foundRange) {
        return num + (foundRange.destinationStart - foundRange.sourceStart);
    } else {
        return num;
    }
};

const recursivelyConvertUnit = (num, unit, almanac) => {
    const conversion = almanac.conversions[unit];
    if (!conversion) {
        // Exit condition, no more converting needed!
        return num;
    } else {
        return recursivelyConvertUnit(convertUnit(num, conversion), conversion.to, almanac);
    }
};

export const calc1 = (input) => {
    const almanac = parseInput(input);

    const finalConversions = almanac.seeds.map(s => recursivelyConvertUnit(s, 'seed', almanac));

    return Math.min(...finalConversions);
}

export const calc2 = (input) => {
    const almanac = parseInput(input, true);

    let minFinal = Number.MAX_SAFE_INTEGER;
    almanac.seeds.forEach(s => {
        for (let seedNum = s.start; seedNum < s.start + s.len; seedNum++) {
            const finalConversion = recursivelyConvertUnit(seedNum, 'seed', almanac);
            if (finalConversion < minFinal) {
                minFinal = finalConversion;
            }
        }
    });

    return minFinal;
}
