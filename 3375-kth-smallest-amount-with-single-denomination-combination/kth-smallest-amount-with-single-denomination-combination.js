/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {
    const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));
    const lcm = (a, b) => (a / gcd(a, b)) * b;

    const n = coins.length;
    const bigCoins = coins.map(BigInt);
    const bigK = BigInt(k);

    // Precompute LCM and subset parity for all 2^n - 1 non-empty subsets
    const subsets = [];
    for (let mask = 1; mask < (1 << n); mask++) {
        let currentLcm = 1n;
        let bitsCount = 0;

        for (let i = 0; i < n; i++) {
            if ((mask & (1 << i)) !== 0) {
                currentLcm = lcm(currentLcm, bigCoins[i]);
                bitsCount++;
            }
        }
        subsets.push({ lcm: currentLcm, sign: bitsCount % 2 === 1 ? 1n : -1n });
    }

    // Inclusion-Exclusion to count valid amounts <= target
    const countMultiples = (target) => {
        let count = 0n;
        for (const { lcm, sign } of subsets) {
            count += sign * (target / lcm);
        }
        return count;
    };

    // Binary search over the answer range [1, min(coins) * k]
    const minCoin = BigInt(Math.min(...coins));
    let low = 1n;
    let high = minCoin * bigK;
    let ans = high;

    while (low <= high) {
        const mid = low + (high - low) / 2n;

        if (countMultiples(mid) >= bigK) {
            ans = mid;
            high = mid - 1n;
        } else {
            low = mid + 1n;
        }
    }

    return Number(ans);
};