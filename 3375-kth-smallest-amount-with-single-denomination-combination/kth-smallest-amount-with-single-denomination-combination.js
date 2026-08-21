/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {
    // 1. Sort and prune coins that are multiples of smaller coins
    coins.sort((a, b) => a - b);
    const filtered = [];
    for (const c of coins) {
        if (!filtered.some(base => c % base === 0)) {
            filtered.push(c);
        }
    }

    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const lcm = (a, b) => Math.floor(a / gcd(a, b)) * b;

    const n = filtered.length;
    const subsetCount = 1 << n;

    // 2. Precompute LCM and sign using primitive numbers
    const lcms = new Float64Array(subsetCount);
    const signs = new Int8Array(subsetCount);

    for (let mask = 1; mask < subsetCount; mask++) {
        let curLcm = 1;
        let bits = 0;

        for (let i = 0; i < n; i++) {
            if ((mask & (1 << i)) !== 0) {
                curLcm = lcm(curLcm, filtered[i]);
                bits++;
            }
        }
        lcms[mask] = curLcm;
        signs[mask] = (bits & 1) ? 1 : -1;
    }

    // Inclusion-Exclusion count
    const countMultiples = (target) => {
        let count = 0;
        for (let mask = 1; mask < subsetCount; mask++) {
            count += signs[mask] * Math.floor(target / lcms[mask]);
        }
        return count;
    };

    // 3. Fast binary search using standard Numbers
    let low = 1;
    let high = filtered[0] * k;
    let ans = high;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (countMultiples(mid) >= k) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return ans;
};