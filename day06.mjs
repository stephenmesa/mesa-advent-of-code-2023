const allUniqueCharacters = (buffer) => {
    // console.log({ buffer });
    const seen = {};
    let allUnique = true;

    for (let index = 0; index < buffer.length; index++) {
        const char = buffer[index];
        if (seen[char] === true) {
            allUnique = false;
            break;
        }
        seen[char] = true;
    }

    // console.log({ seenDouble, seen });
    return allUnique;
};

const findStartOfPacketMarkerIndex = (stream) => {
    return findMarkerIndex(stream, 4);
};

const findStartOfMessageMarkerIndex = (stream) => {
    return findMarkerIndex(stream, 14);
};

const findMarkerIndex = (stream, numChars) => {
    const streamChars = stream.split('');

    let index = 0;
    while (index + numChars <= streamChars.length) {
        const buffer = streamChars.slice(index, index + numChars);
        if (allUniqueCharacters(buffer)) {
            return index + numChars;
        }
        index += 1;
    }
};

export const calc1 = (input) => {
    return findStartOfPacketMarkerIndex(input[0]);
}

export const calc2 = (input) => {
    return findStartOfMessageMarkerIndex(input[0]);
}
