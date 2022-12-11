const parseMotion = (motion) => {
    const chunks = motion.split(' ');
    return {
        direction: chunks[0],
        distance: chunks[1],
    };
};

const moveCoordinate = (coordinate, direction) => {
    switch (direction.toLowerCase()) {
        case 'l':
            return {
                x: coordinate.x - 1,
                y: coordinate.y,
            };
        case 'r':
            return {
                x: coordinate.x + 1,
                y: coordinate.y,
            };
        case 'u':
            return {
                x: coordinate.x,
                y: coordinate.y + 1,
            };
        case 'd':
            return {
                x: coordinate.x,
                y: coordinate.y - 1,
            };
        default:
            break;
    }
};

const followKnot = (knot, previousKnot) => {
    const areTouching = Math.abs(knot.x - previousKnot.x) <= 1 && Math.abs(knot.y - previousKnot.y) <= 1;

    if (areTouching) {
        return knot;
    }

    // Check if 2 steps directly up, down, left, or right
    if (knot.x === previousKnot.x && previousKnot.y - knot.y >= 2) {
        // Directly up
        // Move knot 1 step in that direction
        return moveCoordinate(knot, 'u');
    } else if (knot.x === previousKnot.x && knot.y - previousKnot.y >= 2) {
        // Directly down
        // Move knot 1 step in that direction
        return moveCoordinate(knot, 'd');
    } else if (knot.y === previousKnot.y && previousKnot.x - knot.x >= 2) {
        // Directly right
        // Move knot 1 step in that direction
        return moveCoordinate(knot, 'r');
    } else if (knot.y === previousKnot.y && knot.x - previousKnot.x >= 2) {
        // Directly left
        // Move knot 1 step in that direction
        return moveCoordinate(knot, 'l');
    }

    // Move diagonally toward previous knot
    const firstMove = previousKnot.x > knot.x ? 'r' : 'l';
    const secondMove = previousKnot.y > knot.y ? 'u' : 'd';
    
    knot = moveCoordinate(knot, firstMove);
    knot = moveCoordinate(knot, secondMove);

    return knot;
};

const processMove = (rope, direction) => {
    // First move the head knot
    rope.head = moveCoordinate(rope.head, direction);
    // The first knot is the head, so update first knot
    rope.knots[0] = rope.head;

    // Then reconcile every subsequent knot
    for (let index = 1; index < rope.knots.length; index++) {
        const previousKnot = rope.knots[index-1];
        const knot = rope.knots[index];
        rope.knots[index] = followKnot(knot, previousKnot);
    }

    // Record tail position history
    rope.tailHistory.push(rope.knots[rope.knots.length-1]);

    return rope;
};

const processMotion = (rope, motion) => {
    for (let index = 0; index < motion.distance; index++) {
        rope = processMove(rope, motion.direction);
    }

    return rope;
};

const processMotions = (rope, motions) => {
    motions.forEach(motion => {
        rope = processMotion(rope, motion);
    });

    return rope;
};

const onlyUniqueCoordinates = (value, index, self) => self.findIndex(v => v.x === value.x && v.y === value.y) === index;

const getUniqueCoordinates = (coords) => {
    return coords.filter(onlyUniqueCoordinates);
};

export const calc1 = (input) => {
    const start = {
        x: 0,
        y: 0,
    };
    const rope = {
        start,
        head: start,
        knots: [
            start,
            start,
        ],
        tailHistory: [start]
    };

    const motions = input.map(parseMotion);

    const processedRope = processMotions(rope, motions);

    const tailCoordinates = getUniqueCoordinates(processedRope.tailHistory);

    return tailCoordinates.length;
}

export const calc2 = (input) => {
    const start = {
        x: 0,
        y: 0,
    };
    const rope = {
        start,
        head: start,
        knots: [
            start,
            start,
            start,
            start,
            start,
            start,
            start,
            start,
            start,
            start,
        ],
        tailHistory: [start]
    };

    const motions = input.map(parseMotion);

    const processedRope = processMotions(rope, motions);

    const tailCoordinates = getUniqueCoordinates(processedRope.tailHistory);

    return tailCoordinates.length;
}
