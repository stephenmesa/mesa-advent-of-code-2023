const parseStacks = (stacksInput) => {
    // console.log({ stacksInput });
    const lastInput = stacksInput[stacksInput.length-1];
    const stackIndices = lastInput.split(' ').filter(v => v !== '' && v !== ' ').map(Number);

    // console.log({ stackIndices });
    const stacks = {};
    stackIndices.forEach(stackIndex => {
        stacks[stackIndex] = [];
    });

    // console.log({ stacks });
    for (let index = stacksInput.length - 2; index >= 0; index--) {
        const line = stacksInput[index];

        Object.keys(stacks).forEach((key, index) => {
            const val = line[4*index + 1];
            if (val !== ' ') {
                try {
                    stacks[index+1].push(val);
                } catch (ex) {
                    console.log({ stacks, index, val});
                    throw ex;
                }
            }
        });
    }

    return stacks;
};

const parseInstructions = (instructionsInput) => {
    const parsedInstructions = instructionsInput.map(i => {
        const groups = i.match(/move (\d+) from (\d+) to (\d+)/);
        // console.log(groups);
        if (!groups) {
            return null;
        }

        return {
            quantity: Number(groups[1]),
            source: Number(groups[2]),
            destination: Number(groups[3]),
        };
    });

    return parsedInstructions;
};

const parseEntireInput = (input) => {
    const separater = input.findIndex((v) => v === '');
    const stacks = input.slice(0, separater);
    const instructions = input.slice(separater + 1);
    const parsedStacks = parseStacks(stacks);
    const parsedInstructions = parseInstructions(instructions);
    // console.log({ parsedInstructions });

    return {
        stacks: parsedStacks,
        instructions: parsedInstructions,
    }
};

const processInstruction = (stacks, instruction, maintainOrder) => {
    // console.log({ stacks, instruction });
    const moving = [];
    for (let index = 0; index < instruction.quantity; index++) {
        if (!maintainOrder) {
            moving.push(stacks[instruction.source].pop());
        } else {
            moving.splice(0, 0, stacks[instruction.source].pop());
        }
    }

    stacks[instruction.destination].push(...moving);

    return stacks;
};

const processInstructions = (stacks, instructions, maintainOrder) => {
    let mutatingStacks = {
        ...stacks,
    };

    // for (let index = 0; index < instructions.length; index++) {
    //     const instruction = instructions[index];
        
    // }

    instructions.forEach((instruction) => {
        mutatingStacks = processInstruction(mutatingStacks, instruction, maintainOrder);
    });

    return mutatingStacks;
};

const getTopValuesFromStacks = (stacks) => {
    return Object.values(stacks).map(stack => stack[stack.length-1]).join('');
}

export const calc1 = (input) => {
    const parsed = parseEntireInput(input);

    const newStacks = processInstructions(parsed.stacks, parsed.instructions, false);

    // console.log({ newStacks });

    return getTopValuesFromStacks(newStacks);
}

export const calc2 = (input) => {
    const parsed = parseEntireInput(input);

    const newStacks = processInstructions(parsed.stacks, parsed.instructions, true);

    // console.log({ newStacks });

    return getTopValuesFromStacks(newStacks);
}
