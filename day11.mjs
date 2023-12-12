const getEmptyRowsAndCols = (grid) => {
    const rowsWithGalaxies = [];
    const colsWithGalaxies = [];

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === '#') {
                rowsWithGalaxies.push(rowIndex);
                colsWithGalaxies.push(colIndex);
            }
        });
    });

    const rowsWithoutGalaxies = grid.map((x, index) => index).filter(i => !rowsWithGalaxies.includes(i));
    const colsWithoutGalaxies = grid[0].map((x, index) => index).filter(i => !colsWithGalaxies.includes(i));

    return {
        rowsWithoutGalaxies,
        colsWithoutGalaxies,
    };
};

const getGalaxies = (grid) => {
    const galaxies = [];

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === '#') {
                galaxies.push({
                    rowIndex,
                    colIndex,
                });
            }
        });
    });

    return galaxies;
}

const getAllPairs = (grid) => {
    const galaxies = getGalaxies(grid);

    const pairs = [];

    galaxies.forEach((a, index) => {
        const otherGalaxies = [...galaxies].splice(0, index + 1);
        otherGalaxies.forEach((b) => {
            if (a != b && !pairs.some(p => (p.a == a || p.b == a) && (p.a == b || p.b == b))) {
                pairs.push({
                    a,
                    b,
                });
            }
        });
    });

    return pairs;
};

const getEmptyRowsBetweenGalaxies = (a, b, empties) => {
    return empties.rowsWithoutGalaxies.filter(i => i > Math.min(a.rowIndex, b.rowIndex) && i < Math.max(a.rowIndex, b.rowIndex)).length;
};

const getEmptyColsBetweenGalaxies = (a, b, empties) => {
    return empties.colsWithoutGalaxies.filter(i => i > Math.min(a.colIndex, b.colIndex) && i < Math.max(a.colIndex, b.colIndex)).length;
};

const getDistance = ({ a, b }, empties, expansionFactor) => {
    const emptyRows = getEmptyRowsBetweenGalaxies(a, b, empties);
    const emptyCols = getEmptyColsBetweenGalaxies(a, b, empties);
    return Math.abs(b.rowIndex - a.rowIndex) + Math.abs(b.colIndex - a.colIndex) + (emptyRows * (expansionFactor - 1)) + (emptyCols * (expansionFactor - 1));
};

const getDistancesOfGalaxies = (grid, empties, expansionFactor) => {
    const pairs = getAllPairs(grid);
    const distances = pairs.map(p => getDistance(p, empties, expansionFactor));
    return distances;
};

const parseGrid = (input) => {
    return input.map(row => row.split(''));
};

export const calc1 = (input) => {
    const grid = parseGrid(input);
    const empties = getEmptyRowsAndCols(grid);
    const distances = getDistancesOfGalaxies(grid, empties, 2);
    return distances.reduce((a, b) => a+b, 0);
}

export const calc2 = (input, expansionFactor = 1000000) => {
    const grid = parseGrid(input);
    const empties = getEmptyRowsAndCols(grid);
    const distances = getDistancesOfGalaxies(grid, empties, expansionFactor);
    return distances.reduce((a, b) => a+b, 0);
}
