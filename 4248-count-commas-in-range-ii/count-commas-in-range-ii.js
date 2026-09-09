/**
 * @param {number} n
 * @return {number}
 */
var countCommas = function(n) {
    let bigN = BigInt(n);
    let ans = 0n;
    let threshold = 1000n;

    while (threshold <= bigN) {
        ans += bigN - threshold + 1n;
        threshold *= 1000n;
    }

    return Number(ans);
};