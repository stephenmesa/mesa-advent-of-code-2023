export const getPriority = (item) => {
    if (item === item.toLowerCase()) {
        return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else {
        return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27
    }
};

export const calc1 = (input) => {
    const sacks = input.map((sack) => {
        const items = sack.split('');
        const firstHalf = items.slice(0, items.length / 2);
        const secondHalf = items.slice(items.length / 2);

        const itemsInBoth = [];
        for (let index = 0; index < secondHalf.length; index++) {
            const item = secondHalf[index];
            if (firstHalf.includes(item) && !itemsInBoth.includes(item)) {
                itemsInBoth.push(item);
            }
        }

        const priorities = itemsInBoth.map(getPriority);

        return {
            items,
            itemsInBoth,
            priorities,
        };
    });

    const allPriorities = sacks.map(s => s.priorities);

    const totalPriorities = allPriorities.reduce((a, v) => a + v.reduce((aa, vv) => aa + vv, 0), 0);

    return totalPriorities;
}

const getGroups = (input) => {
    const groups = [];
    const mutatedInput = [...input];
    while (mutatedInput.length > 0) {
        groups.push(mutatedInput.splice(0, 3));
    }
    return groups;
};

const findGroupBadge = (group) => {
    const itemLookup = {};
    for (let index = 0; index < group.length; index++) {
        const bag = group[index].split('');
        const bagItemLookup = {};
        for (let bagIndex = 0; bagIndex < bag.length; bagIndex++) {
            const item = bag[bagIndex];
            if (!bagItemLookup[item]) {
                bagItemLookup[item] = 1;
                if (!itemLookup[item]) {
                    itemLookup[item] = 1;
                } else {
                    itemLookup[item] += 1;
                }
            }
        }
    }

    for (const key in itemLookup) {
        if (itemLookup[key] === group.length) {
            return key;
        }
    }
};

export const calc2 = (input) => {
    const groups = getGroups(input);
    const badges = groups.map(findGroupBadge);

    return badges.map(getPriority).reduce((a, v) => a + v, 0);
}
