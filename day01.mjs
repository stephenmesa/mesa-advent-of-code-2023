// export const calculateSums = (input) => {
//     const sums = [];
//     let currentSum = 0;
//     for (let index = 0; index < input.length; index++) {
//         const element = input[index];
//         if (element > 0) {
//             currentSum += element;
//         } else {
//             sums.push(currentSum);
//             currentSum = 0;
//         }
//     }
//     if (currentSum > 0) {
//         sums.push(currentSum);
//         currentSum = 0;
//     }

//     return sums;
// }

export const calculateSums = (input) => input.join(',').split(',0,').map(g => g.split(',').reduce((a, v) => a+Number(v), 0));

export const calc1 = (input) => {
    const sums = calculateSums(input);
    return Math.max(...sums);
};

export const calc2 = (input) => {
    const sums = calculateSums(input);
    sums.sort((a,b) => b-a);
    return sums[0] + sums[1] + sums[2];
};
