const isLineCommand = (line) => {
    return line.startsWith('$ ');
}

const parseLineCommand = (line) => {
    const chunks = line.split(' ');
    if (chunks[0] !== '$') {
        throw new Error('Tried to parse a command that didn\'t start with $');
    }

    const commandName = chunks[1];
    const commandArguments = chunks.slice(2);

    return {
        commandName,
        commandArguments,
    };
}

const processCDCommand = (state, args) => {
    switch (args[0]) {
        case '/':
            state.workingDirectory = state.filesystem;
            break;
        default:
            state.workingDirectory = state.workingDirectory[args[0]];
            break;
    }

    return state;
};

const parseLSOutput = (output) => {
    const chunks = output.split(' ');
    if (chunks[0] === 'dir') {
        const dirName = chunks[1];
        return {
            type: 'dir',
            name: dirName,
        };
    } else {
        const fileName = chunks[1];
        const fileSize = Number(chunks[0]);
        return {
            type: 'file',
            name: fileName,
            size: fileSize,
        };
    }
};

const processLSCommand = (state, outputLines) => {
    outputLines.map(parseLSOutput).forEach(parsedOutput => {
        switch (parsedOutput.type) {
            case 'dir':
                state.workingDirectory[parsedOutput.name] = {
                    '..': state.workingDirectory,
                };
                break;
            case 'file':
                state.workingDirectory[parsedOutput.name] = parsedOutput.size;
                break;
            default:
                throw new Error('Unsupported output type for LS command');
        }
    });

    return state;
}

const processCommand = (state, command, outputLines) => {
    switch (command.commandName) {
        case 'cd':
            return processCDCommand(state, command.commandArguments);
        case 'ls':
            return processLSCommand(state, outputLines);
        default:
            throw new Error(`Unsupported command: ${command.commandName}`);
    }
};

const parseAllInput = (input) => {
    let cursorIndex = 0;
    let state = {
        filesystem: {},
        workingDirectory: null,
    }
    while (cursorIndex < input.length) {
        if (isLineCommand(input[cursorIndex])) {
            const parsedCommand = parseLineCommand(input[cursorIndex]);
            
            const outputLines = [];
            let outputLineCursorIndex = cursorIndex+1;
            while (outputLineCursorIndex < input.length && !isLineCommand(input[outputLineCursorIndex])) {
                outputLines.push(input[outputLineCursorIndex]);
                outputLineCursorIndex += 1;
            }
            cursorIndex = outputLineCursorIndex;
            
            state = processCommand(state, parsedCommand, outputLines);
        } else {
            cursorIndex += 1;
        }
    }

    return state;
}

const computeFolderSizes = (filesystem, folderSizes) => {
    let totalSize = 0;
    for (const key in filesystem) {
        if (Object.hasOwnProperty.call(filesystem, key)) {
            const element = filesystem[key];
            if (key !== '..') {
                if (typeof element === 'number') {
                    totalSize += element;
                } else if (typeof element === 'object') {
                    const folderSize = computeFolderSizes(element, folderSizes);
                    totalSize += folderSize;
                }
            }
        }
    }

    folderSizes.push(totalSize);
    return totalSize;
};

const addFoldeerSizes = (folderSizes) => {
    return folderSizes.filter(s => s <= 100000).reduce((a, c) => a+c, 0);
}

export const calc1 = (input) => {
    const state = parseAllInput(input);
    const folderSizes = [];
    computeFolderSizes(state.filesystem, folderSizes);
    return addFoldeerSizes(folderSizes);
}

const getMinFolderSize = (folderSizes) => {
    return folderSizes.sort((a,b) => a - b)[0];
}

export const calc2 = (input) => {
    const state = parseAllInput(input);
    const folderSizes = [];
    const totalUsedSize = computeFolderSizes(state.filesystem, folderSizes);
    const totalUnusedSize = 70000000 - totalUsedSize;
    const spaceNeeded = 30000000 - totalUnusedSize;
    const candidates = folderSizes.filter(s => s >= spaceNeeded);
    const minCandidate = getMinFolderSize(candidates);
    return minCandidate;
}
