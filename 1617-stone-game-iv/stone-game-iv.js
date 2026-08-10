/**
 * @param {number} n
 * @return {boolean}
 */
var winnerSquareGame = function(n) {
    // 1. Using Uint8Array is significantly faster than a generic Array in JS
    const dp = new Uint8Array(n + 1);
    
    // 2. Pre-calculating max square limits avoids repeated multiplication in the loop condition
    for (let i = 1; i <= n; i++) {
        for (let k = 1; ; k++) {
            const square = k * k;
            if (square > i) break;
            
            // If the remaining state is a losing state (0), current state is a winning state (1)
            if (dp[i - square] === 0) {
                dp[i] = 1;
                break;
            }
        }
    }
    
    return dp[n] === 1;
};
