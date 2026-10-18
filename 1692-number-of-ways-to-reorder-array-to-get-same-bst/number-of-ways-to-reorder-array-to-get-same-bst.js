/**
 * @param {number[]} nums
 * @return {number}
 */
var numOfWays = function(nums) {
    const MOD = 10n ** 9n + 7n;
    const n = nums.length;
    
    // Precompute Pascal's triangle for combinations C(n, k)
    const combinations = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0n));
    for (let i = 0; i <= n; i++) {
        combinations[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            combinations[i][j] = (combinations[i - 1][j - 1] + combinations[i - 1][j]) % MOD;
        }
    }

    function getWays(arr) {
        if (arr.length <= 2) return 1n;

        const root = arr[0];
        const left = [];
        const right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        const leftWays = getWays(left);
        const rightWays = getWays(right);

        // Ways to interleave left and right subtree elements: C(left.length + right.length, left.length)
        const totalWays = combinations[left.length + right.length][left.length];

        return (((totalWays * leftWays) % MOD) * rightWays) % MOD;
    }

    // Subtract 1 because the original array ordering itself shouldn't be counted as a "reordering"
    return Number((getWays(nums.map(BigInt)) - 1n + MOD) % MOD);
};