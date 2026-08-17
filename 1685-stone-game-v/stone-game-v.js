/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function(stoneValue) {
    const n = stoneValue.length;
    const prefix = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + stoneValue[i];
    }

    // Flattened memo array for maximum V8 engine performance
    const memo = new Int32Array(n * n).fill(-1);

    const getSum = (i, j) => prefix[j + 1] - prefix[i];

    const dp = (i, j) => {
        if (i >= j) return 0;
        const key = i * n + j;
        if (memo[key] !== -1) return memo[key];

        let maxScore = 0;
        const total = getSum(i, j);

        for (let k = i; k < j; k++) {
            const leftSum = getSum(i, k);
            const rightSum = total - leftSum;

            if (leftSum < rightSum) {
                // If leftSum + total/2 cannot beat current maxScore, can prune
                maxScore = Math.max(maxScore, leftSum + dp(i, k));
            } else if (rightSum < leftSum) {
                maxScore = Math.max(maxScore, rightSum + dp(k + 1, j));
            } else {
                maxScore = Math.max(
                    maxScore,
                    leftSum + Math.max(dp(i, k), dp(k + 1, j))
                );
            }
        }

        return (memo[key] = maxScore);
    };

    return dp(0, n - 1);
};