/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */
var smallestNumber = function(num, t) {
    // Helper to calculate the minimum number of digits required to satisfy remaining factors
    function getRequiredLength(c2, c3, c5, c7) {
        let digits = c5 + c7; // 5 and 7 can only be formed by digits 5 and 7
        let min23Digits = 1e9;

        // Brute force choices for 2s and 3s since required factor counts are small (max ~48)
        let max9 = Math.floor((c3 + 1) / 2);
        for (let n9 = 0; n9 <= max9; ++n9) {
            let rem3 = Math.max(0, c3 - 2 * n9);
            let max8 = Math.floor((c2 + 2) / 3);
            for (let n8 = 0; n8 <= max8; ++n8) {
                let rem2 = Math.max(0, c2 - 3 * n8);
                
                // 2 and 3 can form a 6
                let max6 = Math.min(rem2, rem3);
                for (let n6 = 0; n6 <= max6; ++n6) {
                    let r2 = rem2 - n6;
                    let r3 = rem3 - n6;
                    
                    // Remaining 2s can form 4s
                    let n4 = Math.floor((r2 + 1) / 2);
                    let n2 = r2 % 2;
                    min23Digits = Math.min(min23Digits, n9 + n8 + n6 + n4 + n2 + r3);
                }
            }
        }
        return digits + (min23Digits === 1e9 ? 0 : min23Digits);
    }

    // Helper to generate the lexicographically smallest trailing string for remaining factors
    function getMinSuffix(c2, c3, c5, c7, targetLen) {
        let suff = "";
        while (c5 > 0) { suff += '5'; c5--; }
        while (c7 > 0) { suff += '7'; c7--; }

        let best23 = "";
        let minLen = 1e9;

        // Find combination of digits 2, 3, 4, 6, 8, 9 with minimal length and lexicographically smallest layout
        for (let n9 = 0; n9 <= 30; ++n9) {
            for (let n8 = 0; n8 <= 30; ++n8) {
                for (let n6 = 0; n6 <= 1; ++n6) { // at most one 6 is needed for pairing optimally
                    for (let n4 = 0; n4 <= 2; ++n4) {
                        for (let n2 = 0; n2 <= 2; ++n2) {
                            for (let n3 = 0; n3 <= 1; ++n3) {
                                let total2 = 3 * n8 + n6 + 2 * n4 + n2;
                                let total3 = 2 * n9 + n6 + n3;
                                
                                if (total2 >= c2 && total3 >= c3) {
                                    let len = n9 + n8 + n6 + n4 + n2 + n3;
                                    if (len < minLen) {
                                        minLen = len;
                                        best23 = '2'.repeat(n2) + '3'.repeat(n3) + '4'.repeat(n4) + '6'.repeat(n6) + '8'.repeat(n8) + '9'.repeat(n9);
                                    } else if (len === minLen) {
                                        let curr = '2'.repeat(n2) + '3'.repeat(n3) + '4'.repeat(n4) + '6'.repeat(n6) + '8'.repeat(n8) + '9'.repeat(n9);
                                        if (curr < best23) best23 = curr;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        suff += best23;
        suff = suff.split('').sort().join('');

        // Pad with '1's at the front to reach target length if allowed
        if (suff.length < targetLen) {
            suff = '1'.repeat(targetLen - suff.length) + suff;
        }
        return suff;
    }

    let c2 = 0, c3 = 0, c5 = 0, c7 = 0;
    let bigT = BigInt(t);
    
    while (bigT % 2n === 0n) { c2++; bigT /= 2n; }
    while (bigT % 3n === 0n) { c3++; bigT /= 3n; }
    while (bigT % 5n === 0n) { c5++; bigT /= 5n; }
    while (bigT % 7n === 0n) { c7++; bigT /= 7n; }
    
    if (bigT > 1n) return "-1"; // Contains invalid primes like 11, 13

    const n = num.length;
    let req2 = new Array(n + 1).fill(0);
    let req3 = new Array(n + 1).fill(0);
    let req5 = new Array(n + 1).fill(0);
    let req7 = new Array(n + 1).fill(0);

    req2[0] = c2; req3[0] = c3; req5[0] = c5; req7[0] = c7;

    // Step 1: Push forward matching num's prefix
    let matchLen = 0;
    for (let i = 0; i < n; ++i) {
        let d = parseInt(num[i], 10);
        if (d === 0) break; // Cannot match 0

        let r2 = req2[i], r3 = req3[i], r5 = req5[i], r7 = req7[i];
        if (d === 2 || d === 6 || d === 4 || d === 8) {
            if (d === 2) r2--;
            else if (d === 4) r2 -= 2;
            else if (d === 6) { r2--; r3--; }
            else if (d === 8) r2 -= 3;
        }
        if (d === 3 || d === 9) {
            if (d === 3) r3--;
            else if (d === 9) r3 -= 2;
        }
        if (d === 5) r5--;
        if (d === 7) r7--;

        req2[i + 1] = Math.max(0, r2);
        req3[i + 1] = Math.max(0, r3);
        req5[i + 1] = Math.max(0, r5);
        req7[i + 1] = Math.max(0, r7);
        matchLen++;
    }

    // If the entire string matches perfectly and satisfies t
    if (matchLen === n && req2[n] === 0 && req3[n] === 0 && req5[n] === 0 && req7[n] === 0) {
        return num;
    }

    // Step 2: Backtrack to find the first position we can increment
    for (let i = matchLen; i >= 0; --i) {
        let startDigit = (i === n) ? 10 : (parseInt(num[i], 10) + 1);
        for (let d = startDigit; d <= 9; ++d) {
            let r2 = req2[i], r3 = req3[i], r5 = req5[i], r7 = req7[i];
            if (d === 2) r2--;
            else if (d === 3) r3--;
            else if (d === 4) r2 -= 2;
            else if (d === 5) r5--;
            else if (d === 6) { r2--; r3--; }
            else if (d === 7) r7--;
            else if (d === 8) r2 -= 3;
            else if (d === 9) r3 -= 2;

            r2 = Math.max(0, r2);
            r3 = Math.max(0, r3);
            r5 = Math.max(0, r5);
            r7 = Math.max(0, r7);

            let remLen = n - 1 - i;
            if (getRequiredLength(r2, r3, r5, r7) <= remLen) {
                let ans = num.substring(0, i) + d;
                ans += getMinSuffix(r2, r3, r5, r7, remLen);
                return ans;
            }
        }
    }

    // Step 3: If no same-length configuration fits, increase the overall string length
    let newLen = Math.max(n + 1, getRequiredLength(c2, c3, c5, c7));
    return getMinSuffix(c2, c3, c5, c7, newLen);
};
