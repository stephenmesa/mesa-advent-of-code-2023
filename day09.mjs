const getNewHeadCoordinates = (board, direction) => {
    switch (direction.toLowerCase()) {
        case 'r':
            return {
                x: board.head.x + 1,
                y: board.head.y,
            };
        case 'd':
            return {
                x: board.head.x,
                y: board.head.y - 1,
            };
        case 'l':
            return {
                x: board.head.x - 1,
                y: board.head.y,
            };
        case 'u':
            return {
                x: board.head.x,
                y: board.head.y + 1,
            };
    }
};

export const getNewTailCoordinates = (head, tail, directionMoved) => {
    // console.log({
    //     head, tail, directionMoved
    // });
    const xDiff = Math.abs(head.x - tail.x);
    const yDiff = Math.abs(head.y - tail.y);

    const tailMustMove = xDiff > 1 || yDiff > 1;
    const isDiagonal = xDiff > 0 && yDiff > 0;

    // console.log({
    //     xDiff,
    //     yDiff,
    //     tailMustMove,
    //     isDiagonal,
    // });

    if (!tailMustMove) {
        return tail;
    }

    if (!isDiagonal) {
        

        switch (directionMoved.toLowerCase()) {
            case 'r':
                return {
                    // x: tail.x + 1,
                    x: head.x - 1,
                    y: head.y,
                };
            case 'd':
                return {
                    x: head.x,
                    // y: tail.y - 1,
                    y: head.y + 1,
                };
            case 'l':
                return {
                    // x: tail.x - 1,
                    x: head.x + 1,
                    y: head.y,
                };
            case 'u':
                return {
                    x: head.x,
                    // y: tail.y + 1,
                    y: head.y - 1,
                };
        }
    } else {
        // Determine which diagonal direction to move
        const xDir = head.x > tail.x;
        const yDir = head.y > tail.y;
        const diagDir = `${xDir ? 'r' : 'l'}${yDir ? 'u' : 'd'}`;

        switch (diagDir) {
            case 'ru':
                return {
                    x: tail.x + 1,
                    y: tail.y + 1,
                };
            case 'rd':
                return {
                    x: tail.x + 1,
                    y: tail.y - 1,
                };
            case 'lu':
                return {
                    x: tail.x - 1,
                    y: tail.y + 1,
                };
            case 'ld':
                return {
                    x: tail.x - 1,
                    y: tail.y - 1,
                };
        }
    }
};

const processCommand = (board, direction) => {
    // console.log('processCommand', { direction });
    // move head
    const newHeadCoordinates = getNewHeadCoordinates(board, direction);

    // determine fate of tail
    const newTailCoordinates = getNewTailCoordinates(newHeadCoordinates, board.tail, direction);

    // console.log({
    //     newHeadCoordinates,
    //     newTailCoordinates,
    // });

    board.head = newHeadCoordinates;
    board.tail = newTailCoordinates;
    board.tailHistory.push(newTailCoordinates);

    return board;
};

const processCommand2 = (board, direction) => {
    // console.log('processCommand', { direction });
    // move head
    const newHeadCoordinates = getNewHeadCoordinates(board, direction);
    
    const newKnots = {};
    let previousKnotCoordinates = newHeadCoordinates;

    const knotKeys = Object.keys(board.knots);
    for (let index = 0; index < knotKeys.length; index++) {
        const knotKey = knotKeys[index];
        newKnots[knotKey] = getNewTailCoordinates(previousKnotCoordinates, board.knots[knotKey], direction);
        previousKnotCoordinates = newKnots[knotKey];
        // console.log({ previousKnotCoordinates });
    }

    // determine fate of tail
    // const newTailCoordinates = getNewTailCoordinates(newHeadCoordinates, board.tail, direction);

    // console.log({
    //     newHeadCoordinates,
    //     newTailCoordinates,
    // });

    board.head = newHeadCoordinates;
    board.knots = newKnots;
    board.tailHistory.push(previousKnotCoordinates);

    // console.log({
    //     head: board.head,
    //     knots: board.knots,
    //     tailHistory: board.tailHistory,
    // });

    return board;
};

const processCommands = (board, command, part2 = false) => {
    for (let index = 0; index < command.steps; index++) {
        if (part2) {
            board = processCommand2(board, command.direction);    
        } else {
            board = processCommand(board, command.direction);
        }
    }

    return board;
};

const parseCommand = (line) => {
    const chunks = line.split(' ');

    return {
        direction: chunks[0],
        steps: Number(chunks[1]),
    };
}

const onlyUniqueCoordinates = (value, index, self) => self.findIndex(v => v.x === value.x && v.y === value.y) === index;

const getUniqueCoordinates = (coords) => {
    return coords.filter(onlyUniqueCoordinates);
};

export const calc1 = (input) => {
    const commands = input.map(parseCommand);

    // console.log({ commands });

    let board = {
        start: {
            x: 0,
            y: 0,
        },
        head: {
            x: 0,
            y: 0,
        },
        tail: {
            x: 0,
            y: 0,
        },
        tailHistory: [
            {
                x: 0,
                y: 0,
            },
        ]
    };

    commands.forEach((command) => {
        board = processCommands(board, command);
    });

    // console.log(board.tailHistory);

    const uniqueTailHistory = getUniqueCoordinates(board.tailHistory);

    console.log(uniqueTailHistory);

    return uniqueTailHistory.length;
}

export const calc2 = (input) => {
    const commands = input.map(parseCommand);

    // console.log({ commands });

    const startCoord = { x: 0, y: 0 };

    let board = {
        start: startCoord,
        head: startCoord,
        knots: {
            1: startCoord,
            2: startCoord,
            3: startCoord,
            4: startCoord,
            5: startCoord,
            6: startCoord,
            7: startCoord,
            8: startCoord,
            9: startCoord,
        },
        tailHistory: [
            {
                x: 0,
                y: 0,
            },
        ]
    };

    commands.forEach((command) => {
        board = processCommands(board, command, true);
    });

    // console.log(board.tailHistory);

    const uniqueTailHistory = getUniqueCoordinates(board.tailHistory);

    // console.log(uniqueTailHistory);

    return uniqueTailHistory.length;
}
