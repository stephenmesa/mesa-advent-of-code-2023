const parseInput = (input) => {
    return input.toString().split('').filter(isFinite);
}

const numberWords = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'zero': 0,
};

const parseInput2 = (input) => {
    return input.toString().split('').map((char, index, arr) => {
        if (isFinite(char)) {
            return Number(char);
        } else {
            // must be a character, see if it matches a number word
            const remainingChars = arr.slice(index).join('');
            for (const key in numberWords) {
                if (Object.hasOwnProperty.call(numberWords, key)) {
                    if(remainingChars.startsWith(key)) {
                        return numberWords[key];
                    }
                }
            }
        }

        return null;
    }).filter(x => x != null);
};

const calculateCalibration = (input) => {
    const nums = parseInput(input);
    return nums[0] + nums[nums.length - 1];
};

const calculateCalibration2 = (input) => {
    const nums = parseInput2(input);
    return nums[0].toString() + nums[nums.length - 1].toString();
};

export const calc1 = (input) => {
    return input.map(calculateCalibration).map(Number).reduce((a, b) => a + b, 0);
};

export const calc2 = (input) => {
    return input.map(calculateCalibration2).map(Number).reduce((a, b) => a + b, 0);
};
