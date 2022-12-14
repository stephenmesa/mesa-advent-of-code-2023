const parsePairs = (input) => {
    const pairs = [];
    for (let index = 0; index < input.length; index += 3) {
        const left = input[index];
        const right = input[index+1];
        pairs.push({
            left,
            right,
        });
    }

    return pairs;
}

const compareArrays = (left, right) => {
    // console.log('Comparing arrays', { left, right });
    while (left.length > 0 || right.length > 0) {
        let leftValue = left.length > 0 ? left[0] : null;
        let rightValue = right.length > 0 ? right[0] : null;
        if (leftValue !== null && rightValue === null) {
            // Right side is smaller
            // console.log('Right side is smaller, so inputs are in the wrong order')
            return false;
        }
        if (leftValue === null && rightValue !== null) {
            // Left side is smaller
            // console.log('Left side is smaller, so inputs are in the right order')
            return true;
        }

        left.splice(0, 1);
        right.splice(0, 1);

        if (typeof leftValue === 'number') {
            if (typeof rightValue === 'number') {
                // Both numbers, straight comparison
                if (leftValue === rightValue) {
                    // console.log(`${leftValue} === ${rightValue}. Continuing...`);
                    continue;
                } else {
                    // console.log(`${leftValue} is ${leftValue < rightValue ? 'less' : 'greater'} than ${rightValue}, so inputs are in the ${leftValue < rightValue ? 'right' : 'wrong'} order`);
                    return leftValue < rightValue;
                }
            } else {
                // Right is array. Convert left to array and continue
                // console.log(`Mixed types. Converting ${leftValue} to array and retry comparison`);
                leftValue = [leftValue];
            }
        } else {
            if (typeof rightValue === 'number') {
                // Left is array. Convert right to array and continue
                // console.log(`Mixed types. Converting ${rightValue} to array and retry comparison`);
                rightValue = [rightValue];
            }
        }
        // At this point, the left and right values must be arrays
        const arrayCompare = compareArrays(leftValue, rightValue);
        if (arrayCompare !== null) {
            return arrayCompare;
        }
    }

    return null;
}

const isRightOrderPair = (pair) => {
    const left = JSON.parse(pair.left);
    const right = JSON.parse(pair.right);

    return compareArrays(left, right);
};

const getRightOrderPairs = (pairs) => {
    const rightOrderPairs = [];

    pairs.forEach(pair => {
        if (isRightOrderPair(pair)) {
            rightOrderPairs.push(pair);
        }
    });

    return rightOrderPairs;
};

export const calc1 = (input) => {
    const pairs = parsePairs(input);
    // console.log({ pairs });
    const rightOrderPairs = getRightOrderPairs(pairs);

    // console.log({ rightOrderPairs });
    return rightOrderPairs.map(rop => pairs.indexOf(rop) + 1).reduce((a,c) => a+c, 0);
};

const getCodeValues = (val) => {
    if (val.length === 0) {
        return ['0'];
    }

    const codeValues = [];
    while (val.length > 0) {
        const [ nextVal ] = val.splice(0, 1);
        if (Array.isArray(nextVal)) {
            codeValues.push(...getCodeValues(nextVal));
        } else {
            codeValues.push(nextVal.toString());
        }
    }

    return codeValues;
};

const sortLines = (lines) => {
    const parsedLines = lines.map(l => {
        const p = JSON.parse(l);
        const chars = getCodeValues(p);
        return chars.join('');
    });

    parsedLines.sort();

    // console.log({ parsedLines });
    return parsedLines;
};

const sortLines2 = (lines) => {
    const parsedLines = lines.map(l => JSON.parse(l));

    parsedLines.sort((a, b) => {
        if (a.length === 0) {
            return -1;
        } else if (b.length === 0) {
            return 1;
        }
        const aFirst = a[0];
        const bFirst = b[0];
        if (Array.isArray(aFirst)) {
            if (Array.isArray(bFirst)) {
                // Tie breaker
                // TODO: tie breaker
            } else {
                // Array wins
                return -1;
            }
        } else {
            if (Array.isArray(bFirst)) {
                // Array wins
                return 1;
            } else {
                return aFirst - bFirst;
            }
        }
    });

    // console.log({ parsedLines });
};

export const calc2 = (input) => {
    // THIS DOESN'T WORK! I tried to take a shortcut and it didn't work
    const filteredInput = [...input.filter(l => l !== ''), '[[2]]', '[[6]]'];
    const sortedLines = sortLines(filteredInput);
    const first = sortedLines.indexOf('2') + 1;
    const second = sortedLines.indexOf('6') + 1;
    return first * second;
}
