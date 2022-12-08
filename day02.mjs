const calculateMovePoints = (move) => move;

const moveIndexes = {
    'a': 1,
    'b': 2,
    'c': 3,
    'x': 1,
    'y': 2,
    'z': 3,
};

const winningMoves = {
    1: 2, // Paper beats rock
    2: 3, // Scissors beats paper
    3: 1, // Rock beats scissors
};

const losingMoves = {
    2: 1,
    3: 2,
    1: 3,
};

export const calculateResultPoints = (opponentMove, yourMove) => {
    if (opponentMove === yourMove) {
        // Tie
        return 3;
    }

    if (yourMove === winningMoves[opponentMove]) {
        // Win
        return 6;
    }

    // Loss
    return 0;
};

const getMoveIndex = (move) => moveIndexes[move.toLowerCase()];

export const calculateRoundPoints = (input) => {
    const [ opponentMoveValue, yourMoveValue ] = input.split(' ');

    const opponentMove = getMoveIndex(opponentMoveValue);
    const yourMove = getMoveIndex(yourMoveValue);

    const movePoints = calculateMovePoints(yourMove);

    const resultPoints = calculateResultPoints(opponentMove, yourMove);

    return movePoints + resultPoints;
};

const calculateYourMoveBasedOnResult = (opponentMove, resultRaw) => {
    const result = resultRaw.toLowerCase();

    switch (result) {
        case 'y':
            // Tie
            return opponentMove;
        case 'z':
            // Win
            return winningMoves[opponentMove];
        case 'x':
            return losingMoves[opponentMove];
    }
};

export const calculateRoundPointsV2 = (input) => {
    const [ opponentMoveValue, resultValue ] = input.split(' ');

    const opponentMove = getMoveIndex(opponentMoveValue);
    const yourMove = calculateYourMoveBasedOnResult(opponentMove, resultValue);

    const movePoints = calculateMovePoints(yourMove);

    const resultPoints = calculateResultPoints(opponentMove, yourMove);

    return movePoints + resultPoints;
};

export const calc1 = (input) => {
    const roundPoints = input.map(calculateRoundPoints);

    return roundPoints.reduce((a,c) => a+c, 0);
};

export const calc2 = (input) => {
    const roundPoints = input.map(calculateRoundPointsV2);

    return roundPoints.reduce((a,c) => a+c, 0);
};
