import lcm from 'compute-lcm';

const parseNode = (input) => {
    const [ nodeName, pointersString ] = input.split(' = ');
    const pointers = pointersString.replace(/[\(\)]/g, '').split(', ');

    return {
        nodeName,
        pointers,
    }
};

const parseMap = (input) => {
    const instructions = input[0].split('');

    const parsedNodes = input.slice(2).map(parseNode);

    const nodes = {};

    parsedNodes.forEach(n => {
        nodes[n.nodeName] = n;
    });

    return {
        instructions,
        nodes,
    }
};

const traverseMapAlt = (map, start = 'AAA') => {
    let stepCount = 0;
    let cursor = start;
    let instructionCursor = 0;

    while (!cursor.endsWith('Z')) {
        const instruction = map.instructions[instructionCursor];
        const node = map.nodes[cursor]

        cursor = instruction === 'R' ? node.pointers[1] : node.pointers[0];
        stepCount += 1;

        instructionCursor = (instructionCursor + 1) % map.instructions.length;
    }

    return stepCount;
}

const traverseMap = (map, start = 'AAA', target = 'ZZZ') => {
    let stepCount = 0;
    let cursor = start;
    let instructionCursor = 0;

    while (cursor !== target) {
        const instruction = map.instructions[instructionCursor];
        const node = map.nodes[cursor]

        cursor = instruction === 'R' ? node.pointers[1] : node.pointers[0];
        stepCount += 1;

        instructionCursor = (instructionCursor + 1) % map.instructions.length;
    }

    return stepCount;
}

export const calc1 = (input) => {
    const map = parseMap(input);

    return traverseMap(map);
}

export const calc2 = (input) => {
    const map = parseMap(input);
    const startNodes = Object.keys(map.nodes).filter(k => k.endsWith('A'));
    const distances = startNodes.map(n => traverseMapAlt(map, n));
    return lcm(...distances);
}
