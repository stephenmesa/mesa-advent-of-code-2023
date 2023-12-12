const getStartingPosition = (grid) => {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        const row = grid[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const element = row[colIndex];
            if (element === 'S') {
                return {
                    rowIndex,
                    colIndex,
                };
            }
        }
    }
};

const getValidNeighbors = (grid, coord) => {
    const validNeighbors = [];

    const current = grid[coord.rowIndex][coord.colIndex];

    switch (current) {
        case '|':
        case 'L':
        case 'J':
        case 'S':
            // Look up
            if (coord.rowIndex > 0) {
                const up = grid[coord.rowIndex - 1][coord.colIndex];
                switch (up) {
                    case '7':
                    case 'F':
                    case '|':
                    case 'S':
                        validNeighbors.push({
                            rowIndex: coord.rowIndex - 1,
                            colIndex: coord.colIndex,
                        });
                }
            }
    }

    switch (current) {
        case '|':
        case '7':
        case 'F':
        case 'S':
            // Look down
            if (coord.rowIndex < grid.length - 1) {
                const down = grid[coord.rowIndex + 1][coord.colIndex];
                switch (down) {
                    case 'L':
                    case 'J':
                    case '|':
                    case 'S':
                        validNeighbors.push({
                            rowIndex: coord.rowIndex + 1,
                            colIndex: coord.colIndex,
                        });
                }
            }

    }

    switch (current) {
        case '-':
        case '7':
        case 'J':
        case 'S':
            // Look left
            if (coord.colIndex > 0) {
                const left = grid[coord.rowIndex][coord.colIndex - 1];
                switch (left) {
                    case 'L':
                    case 'F':
                    case '-':
                    case 'S':
                        validNeighbors.push({
                            rowIndex: coord.rowIndex,
                            colIndex: coord.colIndex - 1,
                        });
                }
            }
    }

    switch (current) {
        case '-':
        case 'L':
        case 'F':
        case 'S':
            // Look right
            if (coord.colIndex < grid[coord.rowIndex].length - 1) {
                const right = grid[coord.rowIndex][coord.colIndex + 1];
                switch (right) {
                    case 'J':
                    case '7':
                    case '-':
                    case 'S':
                        validNeighbors.push({
                            rowIndex: coord.rowIndex,
                            colIndex: coord.colIndex + 1,
                        });
                }
            }
    }

    return validNeighbors;
};

const getCoordKey = (coord) => {
    return `${coord.rowIndex},${coord.colIndex}`
}

// const getPath = (grid, coord, visited) => {
//     visited[getCoordKey(coord)] = true;

//     const validNeighbors = getValidNeighbors(grid, coord);
//     const unvisitedValidNeighbors = validNeighbors.filter(c => !visited[getCoordKey(c)]);

//     if (unvisitedValidNeighbors.length === 0) {
//         // Maybe we're back at the start?
//         return [];
//     }

//     const neighbor = unvisitedValidNeighbors[0];
//     return [
//         neighbor,
//         ...getPath(grid, neighbor, visited)
//     ];
// }

const getPathIter = (grid, startingPosition) => {
    const visited = {
        [getCoordKey(startingPosition)]: true,
    }

    const path = [startingPosition];
    let coord = startingPosition;

    let unvisitedValidNeighbors= [];

    do {
        unvisitedValidNeighbors = getValidNeighbors(grid, coord).filter(c => !visited[getCoordKey(c)]);
        coord = unvisitedValidNeighbors[0]
        if (coord) {
            path.push(coord);
            visited[getCoordKey(coord)] = true;
        }
    } while (unvisitedValidNeighbors.length > 0)

    return path;
}

const getMidpoint = (path) => {
    const midpoint = Math.ceil(path.length / 2);

    return midpoint;
}

export const calc1 = (input) => {
    const grid = input;
    const startingPosition = getStartingPosition(grid);
    const path = getPathIter(grid, startingPosition);
    return getMidpoint(path);
}

export const calc2 = (input) => {
}
