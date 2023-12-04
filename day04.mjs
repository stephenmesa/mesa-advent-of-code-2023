const parseCard = (card) => {
    const parts = card.split(":");
    const cardNumber = Number(parts[0].match(/Card\s+(\d+)/)[1]);
    const [ winningNumberString, gameString ] = parts[1].split('|');
    const winningNumbers = winningNumberString.split(' ').filter(s => s !== '' & s !== ' ').map(Number);
    const gameNumbers = gameString.split(' ').filter(s => s !== '' & s !== ' ').map(Number);
    return {
        cardNumber,
        winningNumbers,
        gameNumbers,
        instances: 1,
    };
};

const calculateCardWinner = (card) => {
    let winnings = 0;
    card.gameNumbers.forEach(num => {
        if (card.winningNumbers.includes(num)) {
            if (winnings === 0) {
                winnings = 1;
            } else {
                winnings *= 2;
            }
        }
    });

    return winnings;
};

const calculateNumCardWinners = (card) => {
    let winners = 0;
    card.gameNumbers.forEach(num => {
        if (card.winningNumbers.includes(num)) {
            winners += 1;
        }
    });

    return winners;
};

const processCards = (cards) => {
    const cardMap = {};
    cards.forEach(card => {
        cardMap[card.cardNumber] = card;
    });
    for (let index = 1; index < cards.length; index++) {
        const card = cardMap[index];
        const winners = calculateNumCardWinners(card);
        if (winners > 0) {
            for (let winIndex = card.cardNumber + 1; winIndex <= card.cardNumber + winners; winIndex++) {
                cardMap[winIndex].instances += card.instances;
            }
        }
    }

    return cards;
}

export const calc1 = (input) => {
    const cards = input.map(parseCard);
    const cardWinners = cards.map(calculateCardWinner);
    return cardWinners.reduce((a,b) => a+b, 0);
}

export const calc2 = (input) => {
    const cards = input.map(parseCard);
    const processedCards = processCards(cards);
    return processedCards.map(c => c.instances).reduce((a,b) => a+b, 0);
}
