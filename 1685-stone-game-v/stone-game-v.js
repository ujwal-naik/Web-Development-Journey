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

    const memo = Array.from({ length: n }, () => new Int32Array(n).fill(-1));

    const getSum = (i, j) => prefix[j + 1] - prefix[i];

    const dp = (i, j) => {
        if (i >= j) return 0;
        if (memo[i][j] !== -1) return memo[i][j];

        let maxScore = 0;

        for (let k = i; k < j; k++) {
            const leftSum = getSum(i, k);
            const rightSum = getSum(k + 1, j);

            if (leftSum < rightSum) {
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

        return (memo[i][j] = maxScore);
    };

    return dp(0, n - 1);
};