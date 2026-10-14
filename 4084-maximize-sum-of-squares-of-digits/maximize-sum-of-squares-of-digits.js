/**
 * @param {number} num
 * @param {number} sum
 * @return {string}
 */
var maxSumOfSquares = function(num, sum) {
    // If the maximum possible sum with all 9s is less than required, or 
    // if the minimum possible sum (e.g. 1 followed by zeros, or 0s) exceeds the sum, it's invalid.
    // Wait, a positive integer cannot start with 0 unless num = 1 and sum = 0, but constraints say sum >= 1 and num >= 1.
    // Actually, numbers can have leading zeros in digit construction as long as the total length is `num` 
    // (the problem states "The number of digits in n is exactly num", which typically allows leading zeros if not specified otherwise, 
    // but standard positive integers don't have leading zeros. Let's check Example 1: num = 2, sum = 3 -> "30". Here '30' has length 2 and sum 3).
    
    if (sum > num * 9 || sum < 1) {
        return "";
    }

    let result = [];
    for (let i = 0; i < num; i++) {
        let digit = Math.min(9, sum);
        result.push(digit);
        sum -= digit;
    }

    // If sum is still left after filling all digits, it's impossible
    if (sum > 0) {
        return "";
    }

    return result.join('');
};