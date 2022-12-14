const getMapKey = (coordinate) => `${coordinate.x},${coordinate.y}`;

const isSpaceEligible = (heightMap, visited, from, to) => {
    if (visited[getMapKey(to)] === true) {
        return false;
    }
    if (Object.values(visited).includes(to) === true) {
        return false;
    }
    return (heightMap[to.y][to.x].charCodeAt(0) - 1) <= heightMap[from.y][from.x].charCodeAt(0);
};

const getNeighbors = (heightMap, start, visited) => {
    const neighbors = [];
    if (start.y > 0) {
        const up = {
            y: start.y - 1,
            x: start.x,
        };
        if (isSpaceEligible(heightMap, visited, start, up)) {
            neighbors.push(up);
        }
    }

    if (start.y < heightMap.length - 1) {
        const down = {
            y: start.y + 1,
            x: start.x,
        };
        if (isSpaceEligible(heightMap, visited, start, down)) {
            neighbors.push(down);
        }
    }

    if (start.x > 0) {
        const left = {
            y: start.y,
            x: start.x - 1,
        };
        if (isSpaceEligible(heightMap, visited, start, left)) {
            neighbors.push(left);
        }
    }

    if (start.x < heightMap[0].length - 1) {
        const right = {
            y: start.y,
            x: start.x + 1,
        };
        if (isSpaceEligible(heightMap, visited, start, right)) {
            neighbors.push(right);
        }
    }

    return neighbors;
}

const getNextFromOpenSet = (openSet, fScore) => {
    const newSet = openSet.map(n => ({ n, score: fScore[getMapKey(n)] }));
    newSet.sort((a, b) => a.score - b.score);
    return newSet[0].n;
}

const reconstructPath = (cameFrom, current) => {
    let currentCursor = current;
    console.log({ currentCursor, cameFrom });
    const totalPath = [current];
    while (cameFrom[getMapKey(currentCursor)]) {
        currentCursor = cameFrom[getMapKey(currentCursor)];
        // console.log({ currentCursor });
        totalPath.splice(0, 0, currentCursor);
        // console.log({ totalPath });
    }

    return totalPath;
};

const aStar = (heightMap, start, end) => {
    const h = (n) => {
        return Math.abs(end.x - n.x) ** 2 + Math.abs(end.y - n.y) ** 2;
    };

    const openSet = [start];

    const cameFrom = {};

    const fScore = {
        [getMapKey(start)]: 0,
    };

    while (openSet.length > 0) {
        const current = getNextFromOpenSet(openSet, fScore);
        // console.log({ current });
        if (current.x === end.x && current.y === end.y) {
            return reconstructPath(cameFrom, current);
        }

        openSet.splice(0, 1);

        const neighbors = getNeighbors(heightMap, current, cameFrom);
        // console.log({ neighbors });
        neighbors.forEach(neighbor => {
            // All neighbors are equally valid
            cameFrom[getMapKey(neighbor)] = current;
            // gScore[neighbor] = 1;
            fScore[neighbor] = h(neighbor)
            if (openSet.findIndex(x => x.x === neighbor.x && x.y === neighbor.y) === -1) {
                openSet.push(neighbor);
            }
        });

    }
};

const findPath = (heightMap, start, end, visited = {}) => {
    const visitedMutable = {
        ...visited,
    };
    // Find eligible candidates to move to that haven't been visited yet
    const candidates = [];

    if (start.y > 0) {
        const up = {
            y: start.y - 1,
            x: start.x,
        };
        if (isSpaceEligible(heightMap, visitedMutable, start, up)) {
            if (up.x === end.x && up.y === end.y) {
                // We found it!
                // console.log('Found the end to the up!');
                return [up];
            }
            candidates.push(up);
        }
    }

    if (start.y < heightMap.length - 1) {
        const down = {
            y: start.y + 1,
            x: start.x,
        };
        if (isSpaceEligible(heightMap, visitedMutable, start, down)) {
            if (down.x === end.x && down.y === end.y) {
                // We found it!
                // console.log('Found the end to the down!');
                return [down];
            }
            candidates.push(down);
        }
    }

    if (start.x > 0) {
        const left = {
            y: start.y,
            x: start.x - 1,
        };
        if (isSpaceEligible(heightMap, visitedMutable, start, left)) {
            if (left.x === end.x && left.y === end.y) {
                // We found it!
                // console.log('Found the end to the left!');
                return [left];
            }
            candidates.push(left);
        }
    }

    if (start.x < heightMap[0].length - 1) {
        const right = {
            y: start.y,
            x: start.x + 1,
        };
        if (isSpaceEligible(heightMap, visitedMutable, start, right)) {
            if (right.x === end.x && right.y === end.y) {
                // We found it!
                // console.log('Found the end to the right!');
                return [right];
            }
            candidates.push(right);
        }
    }

    // console.log({ candidates });

    visitedMutable[getMapKey(start)] = true;

    if (candidates.length === 0) {
        // we messed up. Bail!
        return [];
    }

    const possiblePaths = candidates.map(newStart => findPath(heightMap, newStart, end, visitedMutable)).filter(x => x.length > 0);

    // console.log({ visited: Object.keys(visited) });
    // if (Object.keys(visitedMutable).length < 10) {
    //     console.log('dfadffdfadgfga');
    //     possiblePaths.map(p => console.log('Possible path', p));
    // }
    // console.log({ possiblePaths });

    if (possiblePaths.length === 0) {
        // We messed up. Bail!
        return [];
    }
    
    possiblePaths.sort((a,b) => a.length - b.length);

    return [ start, ...possiblePaths[0]];
};

export const calc1 = (input) => {
    let start, end;
    const heightMap = input.map((row, y) => row.split('').map((cell, x) => {
        if (cell === 'S') {
            start = { x, y };
            return 'a';
        } else if (cell === 'E') {
            end = { x, y };
            return 'z';
        } else {
            return cell;
        }
    }));

    // const path = findPath(heightMap, start, end);

    // return path.length;

    const path = aStar(heightMap, start, end);
    console.log({ path });
}

export const calc2 = (input) => {
}
