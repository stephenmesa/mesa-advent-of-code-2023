let superMod = 1;

const parseInput = (input) => {
    const monkeys = [];
    let inputCursor = 0;
    while (inputCursor < input.length) {
        const monkeyLineMatch = input[inputCursor].match(/^Monkey (\d+)/);
        const monkeyIndex = Number(monkeyLineMatch[1]);
        inputCursor += 1;

        const startingItemsMatch = input[inputCursor].match(/Starting items: ([\d, ]+)/);
        const startingItems = startingItemsMatch[1].split(', ').map(Number);
        inputCursor += 1;

        const operationMatch = input[inputCursor].match(/Operation: new = old (.*)/);
        const operationGroup = operationMatch[1];
        const operationChunks = operationGroup.split(' ');
        const operationValue = operationChunks[1];
        let operation = () => {};
        if (operationChunks[0] === '*') {
            if (operationValue === 'old') {
                operation = (old) => old * old;
            } else {
                operation = (old) => old * Number(operationValue);
            }
        } else if (operationChunks[0] === '+') {
            if (operationValue === 'old') {
                operation = (old) => old + old;
            } else {
                operation = (old) => old + Number(operationValue);
            }
        } else {
            throw new Error(`Unsupported operation operand: ${operationChunks[0]}`);
        }
        inputCursor += 1;

        const testMatch = input[inputCursor].match(/Test: divisible by (\d+)/);
        const test = Number(testMatch[1]);
        inputCursor += 1;

        const trueMatch = input[inputCursor].match(/If true: throw to monkey (\d+)/);
        const trueMonkey = Number(trueMatch[1]);
        inputCursor += 1;

        const falseMatch = input[inputCursor].match(/If false: throw to monkey (\d+)/);
        const falseMonkey = Number(falseMatch[1]);
        inputCursor += 1;
        
        monkeys[monkeyIndex] = {
            index: monkeyIndex,
            items: startingItems,
            operation,
            test,
            trueMonkey,
            falseMonkey,
            inspectionCount: 0,
        };

        inputCursor += 1;
    }

    return monkeys;
};

const calculateWorryLevel = (item, operation) => {
    return operation(item);
}

const postProcessWorryLevel = (worryLevel) => {
    return Math.floor(worryLevel / 3);
}

const superModWorryLevel = (worryLevel) => {
    return worryLevel % superMod;
}

const performMonkeyTest = (worryLevel, test) => {
    return worryLevel % test === 0;
}

const simulateMonkeyTurn = (monkeys, monkeyIndex, shouldDivide) => {
    const monkey = monkeys[monkeyIndex];
    while (monkey.items.length > 0) {
        const item = monkey.items[0];
        const initialWorryLevel = calculateWorryLevel(item, monkey.operation);
        const worryLevel = shouldDivide ? postProcessWorryLevel(initialWorryLevel) : superModWorryLevel(initialWorryLevel);
        let destinationMonkey;
        if (performMonkeyTest(worryLevel, monkey.test)) {
            destinationMonkey = monkey.trueMonkey;
        } else {
            destinationMonkey = monkey.falseMonkey;
        }
        monkey.inspectionCount += 1;

        // if (item === 79) {
        //     console.log({ worryLevel, destinationMonkey });
        // }
        // Throw item to monkey
        monkeys[destinationMonkey].items.push(worryLevel);
        monkey.items.splice(0, 1);
    }

    return monkeys;
};

const simulateRound = (monkeys, shouldDivide) => {
    for (let index = 0; index < monkeys.length; index++) {
        monkeys = simulateMonkeyTurn(monkeys, index, shouldDivide);
    }

    return monkeys;
};

const runRounds = (monkeys, numRounds, shouldDivide) => {
    for (let index = 0; index < numRounds; index++) {
        monkeys = simulateRound(monkeys, shouldDivide);

        // switch (index+1) {
        //     case 1:
        //     case 20:
        //     case 1000:
        //     case 2000:
        //     case 3000:
        //     case 4000:
        //     case 5000:
        //     case 6000:
        //     case 7000:
        //     case 8000:
        //     case 9000:
        //     case 10000:
        //         console.log(`Round ${index+1}:`);
        //         // monkeys.map(m => console.log(m.items));
        //         console.log(`Inspections: ${monkeys.map(m => m.inspectionCount).join(',')}`);        
        //         break;
        // }
        // console.log(`Round ${index+1}:`);
        // monkeys.map(m => console.log(m.items));
    }

    return monkeys;
};

export const calc1 = (input) => {
    let monkeys = parseInput(input);
    // monkeys.map(m => console.log(m.items));

    monkeys = runRounds(monkeys, 20, true);
    // Need to track: each monkey, items they hold, how they operate on the items, how they test items and what happens after test, inspection count

    // Find monkey business level by multiplying the inspection count of the top 2 most active monkeys
    // monkeys.map(m => console.log(m.inspectionCount));
    const inspectionCounts = monkeys.map(m => m.inspectionCount);
    inspectionCounts.sort((a,b) => b - a);
    return inspectionCounts[0] * inspectionCounts[1];
}

export const calc2 = (input) => {
    let monkeys = parseInput(input);
    superMod = monkeys.map(m => m.test).reduce((a,c) => a*c, 1);
    // monkeys.map(m => console.log(m.items));

    monkeys = runRounds(monkeys, 10000, false);
    // Need to track: each monkey, items they hold, how they operate on the items, how they test items and what happens after test, inspection count

    // Find monkey business level by multiplying the inspection count of the top 2 most active monkeys
    // monkeys.map(m => console.log(m.inspectionCount));
    const inspectionCounts = monkeys.map(m => m.inspectionCount);
    inspectionCounts.sort((a,b) => b - a);
    return inspectionCounts[0] * inspectionCounts[1];
}
