const calculateScenicScore = (rows, rowIndex, colIndex) => {
    const treeHeight = rows[rowIndex][colIndex];

    // check to the left
    let scenicScoreLeft = 0;
    if (colIndex > 0) {
        for (let index = colIndex - 1; index >= 0; index--) {
            const element = rows[rowIndex][index];
            scenicScoreLeft += 1;
            if (element >= treeHeight) {
                break;
            }
        }
    }

    // check to the top
    let scenicScoreTop = 0;
    if (rowIndex > 0) {
        for (let index = rowIndex - 1; index >= 0; index--) {
            const element = rows[index][colIndex];
            scenicScoreTop += 1;
            if (element >= treeHeight) {
                break;
            }
        }
    }

    // check to the right
    let scenicScoreRight = 0;
    if (colIndex < rows[0].length - 1) {
        for (let index = colIndex + 1; index < rows[0].length; index++) {
            const element = rows[rowIndex][index];
            scenicScoreRight += 1;
            if (element >= treeHeight) {
                break;
            }
        }
    }

    // check to the bottom
    let scenicScoreBottom = 0;

    if (rowIndex < rows.length - 1) {
        for (let index = rowIndex + 1; index < rows.length; index++) {
            const element = rows[index][colIndex];
            scenicScoreBottom += 1;
            if (element >= treeHeight) {
                break;
            }
        }
    }

    // console.log({
    //     rowIndex,
    //     colIndex,
    //     treeHeight,
    //     scenicScoreLeft,
    //     scenicScoreTop,
    //     scenicScoreRight,
    //     scenicScoreBottom,
    // });

    return scenicScoreLeft * scenicScoreTop * scenicScoreRight * scenicScoreBottom;
};

const isTreeVisible = (rows, rowIndex, colIndex) => {
    const treeHeight = rows[rowIndex][colIndex];
    // check to the left
    let visibleFromLeft = true;
    for (let index = 0; index < colIndex; index++) {
        const element = rows[rowIndex][index];
        if (element >= treeHeight) {
            visibleFromLeft = false;
            break;
        }
    }

    if (visibleFromLeft) {
        return true;
    }

    // check to the top
    let visibleFromTop = true;
    for (let index = 0; index < rowIndex; index++) {
        const element = rows[index][colIndex];
        if (element >= treeHeight) {
            visibleFromTop = false;
            break;
        }
    }

    if (visibleFromTop) {
        return true;
    }

    // check to the right
    let visibleFromRight = true;
    for (let index = rows[0].length - 1; index > colIndex; index--) {
        const element = rows[rowIndex][index];
        if (element >= treeHeight) {
            visibleFromRight = false;
            break;
        }
    }

    if (visibleFromRight) {
        return true;
    }

    // check to the bottom
    let visibleFromBottom = true;
    for (let index = rows.length - 1; index > rowIndex; index--) {
        const element = rows[index][colIndex];
        if (element >= treeHeight) {
            visibleFromBottom = false;
            break;
        }
    }

    if (visibleFromBottom) {
        return true;
    }

    return false;
};

const computeVisibleTrees = (input) => {
    const rows = input.map(line => line.split('').map(Number));

    // Start with perimeter
    let numVisibleTrees = (input.length * 2) + ((input[0].length - 2) * 2);

    // Don't calculate outer perimeter
    for (let rowIndex = 1; rowIndex < rows.length - 1; rowIndex++) {
        const row = rows[rowIndex];
        for (let colIndex = 1; colIndex < row.length - 1; colIndex++) {
            // const cell = row[colIndex];
            if (isTreeVisible(rows, rowIndex, colIndex)) {
                numVisibleTrees += 1;
            }
        }
    }
        
    return numVisibleTrees;
}

const computeMaxTreeScenicScore = (input) => {
    const rows = input.map(line => line.split('').map(Number));

    let maxScenicScore = 0;

    // Don't calculate outer perimeter
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const scenicScore = calculateScenicScore(rows, rowIndex, colIndex);
            // console.log({ scenicScore });
            if (scenicScore > maxScenicScore) {
                maxScenicScore = scenicScore;
            }
        }
    }
        
    return maxScenicScore;
}

export const calc1 = (input) => {
    return computeVisibleTrees(input);
}

export const calc2 = (input) => {
    return computeMaxTreeScenicScore(input);
}
