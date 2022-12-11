const parseCommands = (input) => {
    const chunks = input.split(' ');
    return {
        commandName: chunks[0],
        args: chunks.slice(1),
    };
};

const processCRTDisplay = (cpu) => {
    // cheesy bounds check lol
    if (cpu.cycle > 240) {
        return cpu;
    }

    // Draw to CRT
    const pixelPositionRow = Math.floor((cpu.cycle - 1) / 40);
    const pixelPositionCol = ((cpu.cycle - 1) % 40) + 1;

    // console.log({ pixelPositionCol, pixelPositionRow, cycle: cpu.cycle });

    let pixelValue = '.';
    if (Math.abs(pixelPositionCol - cpu.x -  1) <= 1) {
        // The sprite is within range, draw a #
        pixelValue = '#';
    }

    cpu.crt[pixelPositionRow].push(pixelValue);
    return cpu;
}

const assessSignalStrength = (cpu) => {
    if ((cpu.cycle - 20) % 40 === 0) {
        // This is an interesting cycle, so log it
        cpu.interestingSignalStrengths.push(cpu.x * cpu.cycle);
    }

    cpu = processCRTDisplay(cpu);
    return cpu;
};

const processCommand = (cpu, command) => {
    switch (command.commandName) {
        case 'noop':
            // Do nothing
            cpu.cycle += 1;
            cpu = assessSignalStrength(cpu);
            break;
        case 'addx':
            // Wait 1 cycle, then add the parameter to the register
            cpu.cycle += 1;
            cpu = assessSignalStrength(cpu);
            cpu.x += Number(command.args[0]);
            cpu.cycle += 1;
            cpu = assessSignalStrength(cpu);
            break;
        default:
            throw new Error(`Unsupported command: ${command.commandName}`);
    }

    return cpu;
};

const processCommands = (cpu, commands) => {
    commands.forEach(command => {
        cpu = processCommand(cpu, command);
    });
    return cpu;
};

export const calc1 = (input) => {
    let cpu = {
        cycle: 1,
        x: 1,
        interestingSignalStrengths: [],
        crt: [[],[],[],[],[],[]],
    };
    const parsedCommands = input.map(parseCommands);
    // console.log({ parsedCommands });
    cpu = processCommands(cpu, parsedCommands);
    // console.log({ s: cpu.interestingSignalStrengths});
    return cpu.interestingSignalStrengths.reduce((a, c) => a + c, 0);
};

// const drawCRT = (cpu) => {
//     cpu.crt.map(console.log);
// };

export const calc2 = (input) => {
    let cpu = {
        cycle: 1,
        x: 1,
        interestingSignalStrengths: [],
        crt: [[],[],[],[],[],[]],
    };
    cpu = processCRTDisplay(cpu);
    const parsedCommands = input.map(parseCommands);
    // console.log({ parsedCommands });
    cpu = processCommands(cpu, parsedCommands);
    // console.log({ s: cpu.interestingSignalStrengths});
    // drawCRT(cpu);
    return cpu.crt.map(l => l.join('')).join('\n');
};
