/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function(arr, target) {
    const n = arr.length;
    const INF = Infinity;
    
    // minLen[i] stores the minimum length of a valid subarray found in arr[0...i]
    const minLen = new Array(n).fill(INF);
    
    let left = 0;
    let sum = 0;
    let ans = INF;
    let minSoFar = INF;
    
    for (let right = 0; right < n; right++) {
        sum += arr[right];
        
        while (sum > target) {
            sum -= arr[left];
            left++;
        }
        
        if (sum === target) {
            const currLen = right - left + 1;
            
            // Check if there is a valid non-overlapping subarray before `left`
            if (left > 0 && minLen[left - 1] !== INF) {
                ans = Math.min(ans, currLen + minLen[left - 1]);
            }
            
            minSoFar = Math.min(minSoFar, currLen);
        }
        
        minLen[right] = minSoFar;
    }
    
    return ans === INF ? -1 : ans;
};
