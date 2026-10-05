/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function(s) {
    let stack = [0]; // Initialize with a base score of 0

    for (let char of s) {
        if (char === '(') {
            stack.push(0);
        } else {
            let innerScore = stack.pop();
            let currentScore = stack.pop();
            // If innerScore is 0, it means we had "()", so score is 1. 
            // Otherwise, we had "(A)", so score is 2 * innerScore.
            let addedScore = innerScore === 0 ? 1 : 2 * innerScore;
            stack.push(currentScore + addedScore);
        }
    }

    return stack[0];
};