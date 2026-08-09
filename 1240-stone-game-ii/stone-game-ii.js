/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const n = piles.length;
    
    // Calculate suffix sums to quickly get the sum of remaining piles
    const suffixSum = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        suffixSum[i] = suffixSum[i + 1] + piles[i];
    }

    // Memoization table: memo[i][M]
    const memo = Array.from({ length: n }, () => ({}));

    function dp(i, M) {
        // Base case: out of bounds
        if (i >= n) return 0;
        
        // If the current player can take all remaining piles, take them all
        if (i + 2 * M >= n) {
            return suffixSum[i];
        }

        // Return cached result if available
        if (memo[i][M] !== undefined) {
            return memo[i][M];
        }

        let maxStones = 0;

        // Try taking X piles where 1 <= X <= 2 * M
        for (let X = 1; X <= 2 * M; X++) {
            // Stones taken by current player = Total remaining - Max stones opponent can get next turn
            const currentStones = suffixSum[i] - dp(i + X, Math.max(M, X));
            maxStones = Math.max(maxStones, currentStones);
        }

        memo[i][M] = maxStones;
        return memo[i][M];
    }

    return dp(0, 1);
};