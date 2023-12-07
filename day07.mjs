const getHandType2 = (hand) => {
    const m = {};
    let jokers = 0;
    hand.forEach((card) => {
        if (card === 'J') {
            jokers += 1;
        } else {
            m[card] = m[card] ? m[card] + 1 : 1;
        }
    });

    const counts = Object.values(m);

    if (counts.includes(5) ){
        // Five of a kind
        return 7;
    } else if (counts.includes(4)) {
        // Five of a kind with jokers
        if (jokers === 1) {
            return 7;
        }

        // Four of a kind
        return 6;
    } else if (counts.includes(3)) {
        if (jokers === 2) {
            // Five of a kind with jokers
            return 7;
        } else if (jokers === 1) {
            // Four of a kind with jokers
            return 6;
        }

        if (counts.includes(2)) {
            // Full house
            return 5;
        } else {
            // Three of a kind
            return 4;
        }
    } else if (counts.includes(2)) {
        if (jokers === 3) {
            // Five of a kind with jokers
            return 7;
        } else if (jokers === 2) {
            // Four of a kind with jokers
            return 6;
        } else if (jokers === 1) {
            if (counts.filter(c => c === 2).length === 2) {
                // Full house with joker
                return 5;
            } else {
                // Three of a kind with joker
                return 4;
            }
        }
        if (counts.filter(c => c === 2).length === 2) {
            // Two pair
            return 3;
        } else {
            // One pair
            return 2;
        }
    } else  if (counts.includes(1)) {
        if (jokers === 4) {
            // Five of a kind with jokers
            return 7;
        } else if (jokers === 3) {
            // Four of a kind with jokers
            return 6;
        } else if (jokers === 2) {
            // Three of a kind with jokers
            return 4;
        } else if (jokers === 1) {
            // One pair with jokers
            return 2;
        }
        // High card
        return 1;
    } else {
        // OOPS ALL JOKERS
        return 7;
    }
};

const getHandType = (hand) => {
    const m = {};
    hand.forEach((card) => {
        m[card] = m[card] ? m[card] + 1 : 1;
    });

    const counts = Object.values(m);

    if (counts.includes(5) ){
        // Five of a kind
        return 7;
    } else if (counts.includes(4)) {
        // Four of a kind
        return 6;
    } else if (counts.includes(3)) {
        if (counts.includes(2)) {
            // Full house
            return 5;
        } else {
            // Three of a kind
            return 4;
        }
    } else if (counts.includes(2)) {
        if (counts.filter(c => c === 2).length === 2) {
            // Two pair
            return 3;
        } else {
            // One pair
            return 2;
        }
    } else {
        // High card
        return 1;
    }
};

const getCardScore = (card, part2 = false) => {
    switch (card) {
        case 'A':
            return '14';
        case 'K':
            return '13';
        case 'Q':
            return '12';
        case 'J':
            if (part2) {
                return '00';
            } else {
                return '11';
            }
        case 'T':
            return '10';
        default:
            return '0' + card;
    }
};

const getHandScore = (hand, part2 = false) => {
    return Number(hand.map(h => getCardScore(h, part2)).join(''));
}

const compareHands = (hands, part2 = false) => {
    const handsToSort = [...hands];

    handsToSort.sort((a, b) => getHandScore(b.hand, part2) - getHandScore(a.hand, part2));

    return handsToSort;

    // const sortedHands = [];
    // let index = 0;
    // while (index < 5 && handsToSort.length > 1) {

    // }

    // return sortedHands;
};

const sortHands = (hands, part2 = false) => {
    const orderedHands = [];
    for (let index = 7; index > 0; index--) {
        const matchingHands = hands.filter(h => h.type === index);
        if (matchingHands.length === 1) {
            orderedHands.push(matchingHands[0]);
        } else if (matchingHands.length > 1) {
            // Multiple hands for this type- sort by high card
            orderedHands.push(...(compareHands(matchingHands, part2)));
        }
    }

    return orderedHands;
}

const parseHand = (input, part2 = false) => {
    const p = input.split(' ');

    const hand = p[0].split('');
    const bid = Number(p[1]);
    const type = part2 ? getHandType2(hand) : getHandType(hand);

    return {
        hand, bid, type
    }
};

const calculateTotalWinnings = (hands) => {
    let totalWinnings = 0;
    hands.forEach((hand, index) => {
        totalWinnings += hand.bid * (hands.length-index);
    });

    return totalWinnings;
}

export const calc1 = (input) => {
    const hands = input.map(i => parseHand(i));
    const sortedHands = sortHands(hands);
    return calculateTotalWinnings(sortedHands);
}

export const calc2 = (input) => {
    const hands = input.map(i => parseHand(i, true));
    const sortedHands = sortHands(hands, true);
    return calculateTotalWinnings(sortedHands);
}
