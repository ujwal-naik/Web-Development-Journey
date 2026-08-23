/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {
    const n = num.length;
    let diff = 0; // left_sum - right_sum
    let qDiff = 0; // left_? - right_?

    for (let i = 0; i < n / 2; i++) {
        if (num[i] === '?') {
            qDiff++;
        } else {
            diff += Number(num[i]);
        }
    }

    for (let i = n / 2; i < n; i++) {
        if (num[i] === '?') {
            qDiff--;
        } else {
            diff -= Number(num[i]);
        }
    }

    // Bob wins if and only if diff + qDiff * 4.5 === 0
    // Equivalently: 2 * diff + 9 * qDiff === 0
    return (2 * diff + 9 * qDiff) !== 0;
};