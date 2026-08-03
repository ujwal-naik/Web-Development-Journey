/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function(stoneValue) {
    const n = stoneValue.length;
    const dp = new Array(n+1).fill(0);
    for (let i = n - 1;i>= 0 ;i--){
        let currentSum = 0;
        let maxDiff = -Infinity;
        for(let k = 0; k< 3 && i + k <n;k++){
            currentSum += stoneValue[i + k];
            const netGain =currentSum - dp[i + k +1];
            maxDiff =Math.max(maxDiff,netGain);
        }
        dp[i]= maxDiff;
    }
    if (dp[0]>0)return "Alice";
    if (dp[0]<0)return "Bob";
    return "Tie";
};