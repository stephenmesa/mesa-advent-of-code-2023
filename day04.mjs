const generateRange = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt);

const generateAssessments = (pairs) => {
    return pairs.map((p) => {
        const [ first, second ] = p;
        const [ firstMin, firstMax ] = first.split('-').map(Number);
        const firstSections = generateRange(firstMax - firstMin + 1, firstMin);

        const [ secondMin, secondMax ] = second.split('-').map(Number);
        const secondSections = generateRange(secondMax - secondMin + 1, secondMin);

        let fullyOverlaps = false;

        if (!secondSections.find((val) => !firstSections.includes(val))) {
            fullyOverlaps = true;
        }
        if (!firstSections.find((val) => !secondSections.includes(val))) {
            fullyOverlaps = true;
        }

        let anyOverlap = false;

        if (secondSections.find((val) => firstSections.includes(val))) {
            anyOverlap = true;
        }

        if (firstSections.find((val) => secondSections.includes(val))) {
            anyOverlap = true;
        }

        return {
            firstSections,
            secondSections,
            fullyOverlaps,
            anyOverlap,
        }
    });
}

export const calc1 = (input) => {
    const pairs = input.map(i => i.split(','));
    const assessments = generateAssessments(pairs);

    return assessments.map(a => a.fullyOverlaps).filter(v => v === true).length;
}

export const calc2 = (input) => {
    const pairs = input.map(i => i.split(','));
    const assessments = generateAssessments(pairs);

    return assessments.map(a => a.anyOverlap).filter(v => v === true).length;
}
