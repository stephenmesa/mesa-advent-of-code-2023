const allZeroes = (values) => values.every(v => v.val === 0);

const getDiffs = (values) => {
    const newValues = [];
    for (let index = 0; index < values.length - 1; index++) {
        const left = values[index];
        const right = values[index + 1];

        newValues.push({
            val: right.val - left.val,
            left,
            right,
        });
    }

    return newValues;
};

const parseHistory = (input) => {
    let values = input.split(' ').map(v => ({ val: Number(v), left: null, right: null }));
    while (!allZeroes(values)) {
        values = getDiffs(values);
    }

    return values;
};

const calculateNewRightNode = (node) => {
    const newNode = {
        val: node.left.val + node.val,
        left: null,
        right: null,
    }

    if (node.left.right !== null) {
        newNode.left = node.left.right;
        newNode.right = calculateNewRightNode(newNode);
    }

    return newNode;
}

const calculateNewLeftNode = (node) => {
    const newNode = {
        val: node.right.val - node.val,
        left: null,
        right: null,
    }

    if (node.right.left !== null) {
        newNode.right = node.right.left;
        newNode.left = calculateNewLeftNode(newNode);
    }

    return newNode;
}

const extrapolate = (history) => {
    const newNode = {
        val: 0,
        left: history[history.length - 1].right,
        right: null,
    }

    newNode.right = calculateNewRightNode(newNode);

    return newNode;
};

const extrapolateLeft = (history) => {
    const newNode = {
        val: 0,
        left: null,
        right: history[0].left,
    }

    newNode.left = calculateNewLeftNode(newNode);

    return newNode;
};

const getRightmostNode = (node) => {
    if (node.right !== null) {
        return getRightmostNode(node.right);
    }

    return node.val;
}

const getLeftmostNode = (node) => {
    if (node.left !== null) {
        return getLeftmostNode(node.left);
    }

    return node.val;
}

export const calc1 = (input) => {
    const histories = input.map(parseHistory);
    const extrapolations = histories.map(extrapolate);

    const rightMostValues = extrapolations.map(getRightmostNode);
    return rightMostValues.reduce((a, b) => a+b, 0);
}

export const calc2 = (input) => {
    const histories = input.map(parseHistory);
    const extrapolations = histories.map(extrapolateLeft);

    const leftMostValues = extrapolations.map(getLeftmostNode);
    return leftMostValues.reduce((a, b) => a+b, 0);
}
