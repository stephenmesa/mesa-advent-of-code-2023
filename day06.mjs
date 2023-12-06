const parseInput = (input, part2 = false) => {
    const timeInput = input[0];
    const distanceInput = input[1];
    const races = [];

    const times = part2 ?
        [ Number(timeInput.match(/Time:\s+([\s\d]+)/)[1].replace(/\s+/g, ''))] :
        timeInput.match(/Time:\s+([\s\d]+)/)[1].split(/\s+/).map(Number);
    const distances = part2 ?
        [ Number(distanceInput.match(/Distance:\s+([\s\d]+)/)[1].replace(/\s+/g, '') )] :
        distanceInput.match(/Distance:\s+([\s\d]+)/)[1].split(/\s+/).map(Number);
    
    for (let index = 0; index < times.length; index++) {
        races.push({
            time: times[index],
            distance: distances[index],
        });
    }

    return races;
};

const calculateDistance = (race, held) => {
    const speed = held;
    const remainingTime = race.time - held;
    return speed * remainingTime;
}

const calculateNumWaysToWin = (race) => {
    let waysToWin = 0;
    for (let index = 1; index < race.time; index++) {
        const distanceTraveled = calculateDistance(race, index);
        if (distanceTraveled > race.distance) {
            waysToWin += 1;
        }
    }

    return waysToWin;
};

export const calc1 = (input) => {
    const races = parseInput(input);
    const numWaysToWin = races.map(calculateNumWaysToWin);
    return numWaysToWin.reduce((a, b) => a*b, 1);
}

export const calc2 = (input) => {
    const races = parseInput(input, true);
    const numWaysToWin = races.map(calculateNumWaysToWin);
    return numWaysToWin.reduce((a, b) => a*b, 1);
}
