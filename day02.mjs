const parseGame = (input) => {
    const s = input.split(':');
    const gameNumber = s[0].match(/Game (\d+)/)[1];
    const gameInput = s[1];
    const pulls = gameInput.split(';').map(pull => {
        const result = pull.split(',').map(s => {
            const m = s.match(/(\d+) (\w+)/);
            return {
                color: m[2],
                num: m[1],
            }
        });

        const illegalPull = result.some(r => {
            if (r.color === 'green' && r.num > 13) {
                return true;
            }
            if (r.color === 'red' && r.num > 12) {
                return true;
            }
            if (r.color === 'blue' && r.num > 14) {
                return true;
            }
            return false;
        });

        return illegalPull;
    });

    return {
        gameNumber: Number(gameNumber),
        illegal: pulls.some(p => !!p),
    };
};

export const calc1 = (input) => {
    const games = input.map(parseGame);
    const legalGames = games.filter(g => !g.illegal);
    return legalGames.map(g => g.gameNumber).reduce((a,b) => a+b, 0);
}

const parseGame2 = (input) => {
    const s = input.split(':');
    const gameNumber = s[0].match(/Game (\d+)/)[1];
    const gameInput = s[1];
    const pulls = gameInput.split(';').map(pull => {
        const result = pull.split(',').map(s => {
            const m = s.match(/(\d+) (\w+)/);
            return {
                color: m[2],
                num: Number(m[1]),
            }
        });

        return result;
    });

    let maxRed = 0, maxGreen = 0, maxBlue = 0;

    pulls.forEach(pull => {
        pull.forEach(p => {
            if (p.color === 'blue' && p.num > maxBlue) {
                maxBlue = p.num;
            }
            if (p.color === 'red' && p.num > maxRed) {
                maxRed = p.num;
            }
            if (p.color === 'green' && p.num > maxGreen) {
                maxGreen = p.num;
            }
        });
    });

    return {
        gameNumber: Number(gameNumber),
        pulls,
        maxRed,
        maxGreen,
        maxBlue,
    };
};

const getGamePower = (game) => {
    return game.maxRed * game.maxBlue * game.maxGreen;
};

export const calc2 = (input) => {
    const games = input.map(parseGame2);
    const gamePowers = games.map(getGamePower);
    return gamePowers.reduce((a,b) => a+b, 0);
}
