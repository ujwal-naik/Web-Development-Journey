/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */
var minSumSquareDiff = function(nums1, nums2, k1, k2) {
    let n = nums1.length;
    let totalOps = k1 + k2;
    let maxDiff = 0;
    
    const count = new Array(100005).fill(0);
    
    for (let i = 0; i < n; i++) {
        let diff = Math.abs(nums1[i] - nums2[i]);
        count[diff]++;
        if (diff > maxDiff) {
            maxDiff = diff;
        }
    }
    
    // Greedily reduce from maxDiff down to 1
    for (let i = maxDiff; i > 0 && totalOps > 0; i--) {
        if (count[i] === 0) continue;
        
        let reduceCount = Math.min(totalOps, count[i]);
        count[i] -= reduceCount;
        count[i - 1] += reduceCount;
        totalOps -= reduceCount;
    }
    
    // Calculate the final minimum sum of squared differences
    let ans = 0n;
    for (let i = 1; i <= maxDiff; i++) {
        if (count[i] > 0) {
            let val = BigInt(i);
            ans += val * val * BigInt(count[i]);
        }
    }
    
    return Number(ans);
};