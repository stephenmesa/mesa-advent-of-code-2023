const isSpecialCharacter = (x) => {
    return x.match(/\W/) && x !== '.';
};

const isPartNumber = (rowIndex, startIndex, endIndex, rows) => {
    // Make sure the indices won't go out of bounds when checking
    const safeStartIndex = startIndex === 0 ? 1 : startIndex;
    const safeEndIndex = endIndex === rows[rowIndex].length - 1 ? endIndex - 1 : endIndex;

    if (rowIndex > 0) {
        // Not the top row, check the row above
        const toCheck = rows[rowIndex-1].slice(safeStartIndex - 1, safeEndIndex + 2).split('');

        if (toCheck.some(isSpecialCharacter)) {
            return true;
        }
    }

    if (rowIndex < rows.length - 1) {
        // Not the bottom row, check the row below
        const toCheck = rows[rowIndex+1].slice(safeStartIndex - 1, safeEndIndex + 2).split('');

        if (toCheck.some(isSpecialCharacter)) {
            return true;
        }
    }

    // Check the sides
    if (startIndex > 0) {
        if (isSpecialCharacter(rows[rowIndex].split('')[startIndex - 1])) {
            return true;
        }
    }
    if (endIndex < rows[rowIndex].length - 1) {
        if (isSpecialCharacter(rows[rowIndex].split('')[endIndex+1])) {
            return true;
        }
    }

    return false;
};

const getAllNumbers = (rows) => {
    const parsedRows = rows.map((row, rowIndex) => {

        const nums = [];
        const rowChars = row.split('');
        for (let index = 0; index < rowChars.length; index++) {
            const char = rowChars[index];
            if (char.match(/\d/)) {
                const startIndex = index;
                // start of a number
                let foundNumber = [];
                while (index < rowChars.length && rowChars[index].match(/\d/)) {
                    foundNumber.push(rowChars[index]);
                    index += 1;
                }
                const endIndex = index - 1;
                const partNumberFlag = isPartNumber(rowIndex, startIndex, endIndex, rows);
                nums.push({ num: Number(foundNumber.join('')), startIndex, endIndex, partNumberFlag });
            }
        }

        return nums;
    });

    return parsedRows.flat();
};

export const calc1 = (input) => {
    const numbers = getAllNumbers(input);
    const partNumbers = numbers.filter(n => n.partNumberFlag).map(n => Number(n.num));
    const sum = partNumbers.reduce((a,b) => a+b, 0);
    return sum;
};

export const discoverNumber = (index, row) => {
    const numChars = [];
    const rowChars = row.split('');
    if (!rowChars[index].match(/\d/)) {
        return null;
    }

    numChars.push({ val: rowChars[index], index });

    // Check to the left until we hit a non-numeric
    let leftIndex = index - 1;
    while (leftIndex >= 0 && rowChars[leftIndex].match(/\d/))
    {
        numChars.push({ val: rowChars[leftIndex], index: leftIndex });
        leftIndex -= 1;
    }

    // Check to the right until we hit a non-numeric
    let rightIndex = index + 1;
    while (rightIndex < rowChars.length && rowChars[rightIndex].match(/\d/))
    {
        numChars.push({ val: rowChars[rightIndex], index: rightIndex });
        rightIndex += 1;
    }

    numChars.sort((a, b) => a.index - b.index);

    const indices = numChars.map(n => Number(n.index));

    const startIndex = Math.min(...indices);
    const endIndex = Math.max(...indices);

    const num = Number(numChars.map(n => n.val).join(''));

    return {
        num,
        startIndex,
        endIndex,
    };
};

const gatherNeighbors = (colIndex, row, nums) => {
    const charToCheck = row[colIndex];

    if (charToCheck.match(/\d/)) {
        const neighborNumber = discoverNumber(colIndex, row);
        if (neighborNumber !== null) {
            return [...nums, neighborNumber];
        }
    }

    return nums;
};

const getAdjacentNumbers = (rowIndex, colIndex, rows) =>{
    let numbers = [];

    if (rowIndex > 0) {
        // Not the top row, so check above
        const rowToCheck = rows[rowIndex - 1];

        // Check upper left
        if (colIndex > 0) {
            // Not on the far left, so check to the left
            numbers = gatherNeighbors(colIndex - 1, rowToCheck, numbers);
        }

        numbers = gatherNeighbors(colIndex, rowToCheck, numbers);

        if (colIndex < rowToCheck.length - 1) {
            // Not on the far left, so check to the left
            numbers = gatherNeighbors(colIndex + 1, rowToCheck, numbers);
        }
    }

    // Check upper left
    if (colIndex > 0) {
        // Not on the far left, so check to the left
        numbers = gatherNeighbors(colIndex - 1, rows[rowIndex], numbers);
    }

    if (colIndex < rows[rowIndex].length - 1) {
        // Not on the far right, so check to the right
        numbers = gatherNeighbors(colIndex + 1, rows[rowIndex], numbers);
    }

    if (rowIndex < rows.length - 1) {
        // Not the bottom row, so check below
        const rowToCheck = rows[rowIndex + 1];

        // Check upper left
        if (colIndex > 0) {
            // Not on the far left, so check to the left
            numbers = gatherNeighbors(colIndex - 1, rowToCheck, numbers);
        }

        numbers = gatherNeighbors(colIndex, rowToCheck, numbers);

        if (colIndex < rowToCheck.length - 1) {
            // Not on the far left, so check to the left
            numbers = gatherNeighbors(colIndex + 1, rowToCheck, numbers);
        }
    }

    // Dedupe
    numbers = numbers.filter((m, index, ms) => getIndexOfMember(ms, m) === index);

    return numbers;
};
  
const getIndexOfMember = (memberArray, member) => {
    return memberArray.findIndex((m) => m.num === member.num && m.startIndex === member.startIndex && m.endIndex === member.endIndex);
};

const getAllGears = (rows) => {
    let sum = 0;
    rows.forEach((row, rowIndex) => {
        row.split('').forEach((char, charIndex) => {
            if (char === '*') {
                // We found a gear! Look for exactly 2 adjacent numbers
                const adjacentNumbers = getAdjacentNumbers(rowIndex, charIndex, rows);
                if (adjacentNumbers.length === 2) {
                    sum += (adjacentNumbers[0].num * adjacentNumbers[1].num);
                }
            }
        });
    });

    return sum;
};

export const calc2 = (input) => {
    return getAllGears(input);
};
