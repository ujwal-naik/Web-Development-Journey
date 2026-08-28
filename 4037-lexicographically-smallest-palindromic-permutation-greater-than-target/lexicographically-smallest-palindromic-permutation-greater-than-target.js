/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexPalindromicPermutation = function(s, target) {
    const n = s.length;
    const count = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        count[s.charCodeAt(i) - 97]++;
    }

    let oddChar = '';
    let oddCount = 0;
    for (let i = 0; i < 26; i++) {
        if (count[i] % 2 !== 0) {
            oddCount++;
            oddChar = String.fromCharCode(97 + i);
        }
    }

    // A valid palindrome can have at most one odd-frequency character
    if (oddCount > 1 || (n % 2 === 0 && oddCount !== 0)) {
        return "";
    }

    const m = Math.floor(n / 2);
    const halfCount = new Array(26).fill(0);
    for (let i = 0; i < 26; i++) {
        halfCount[i] = Math.floor(count[i] / 2);
    }

    const buildPalindrome = (firstHalf) => {
        let secondHalf = firstHalf.split('').reverse().join('');
        return firstHalf + (n % 2 !== 0 ? oddChar : '') + secondHalf;
    };

    // Case 1: Check if matching the first half of target exactly produces a strictly greater palindrome
    let canMatchPrefix = true;
    const tempHalf = [...halfCount];
    for (let i = 0; i < m; i++) {
        const code = target.charCodeAt(i) - 97;
        if (tempHalf[code] > 0) {
            tempHalf[code]--;
        } else {
            canMatchPrefix = false;
            break;
        }
    }

    if (canMatchPrefix) {
        const candidate = buildPalindrome(target.slice(0, m));
        if (candidate > target) {
            return candidate;
        }
    }

    // Case 2: Find the longest prefix match (largest index i from m - 1 down to 0)
    // where we can place a character strictly greater than target[i]
    for (let i = m - 1; i >= 0; i--) {
        // Count characters available up to index i - 1 matching target
        const currentCount = [...halfCount];
        let validPrefix = true;
        for (let j = 0; j < i; j++) {
            const code = target.charCodeAt(j) - 97;
            if (currentCount[code] > 0) {
                currentCount[code]--;
            } else {
                validPrefix = false;
                break;
            }
        }

        if (!validPrefix) continue;

        const targetCode = target.charCodeAt(i) - 97;
        for (let c = targetCode + 1; c < 26; c++) {
            if (currentCount[c] > 0) {
                currentCount[c]--;
                
                // Build the first half: prefix + chosen character + smallest remaining characters
                let firstHalf = target.slice(0, i) + String.fromCharCode(97 + c);
                for (let k = 0; k < 26; k++) {
                    if (currentCount[k] > 0) {
                        firstHalf += String.fromCharCode(97 + k).repeat(currentCount[k]);
                    }
                }

                return buildPalindrome(firstHalf);
            }
        }
    }

    return "";
};