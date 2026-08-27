/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexGreaterPermutation = function(s, target) {
    const n = s.length;
    
    // Count frequencies of each character in s
    const totalCount = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        totalCount[s.charCodeAt(i) - 97]++;
    }

    // Try each prefix length from largest (n - 1) down to 0
    for (let i = n - 1; i >= 0; i--) {
        const count = [...totalCount];
        let canFormPrefix = true;

        // Check if s can match target[0 ... i-1]
        for (let j = 0; j < i; j++) {
            const charCode = target.charCodeAt(j) - 97;
            if (--count[charCode] < 0) {
                canFormPrefix = false;
                break;
            }
        }

        if (!canFormPrefix) continue;

        // Find the smallest character strictly greater than target[i]
        const targetChar = target.charCodeAt(i) - 97;
        let chosenChar = -1;
        for (let c = targetChar + 1; c < 26; c++) {
            if (count[c] > 0) {
                chosenChar = c;
                break;
            }
        }

        if (chosenChar !== -1) {
            count[chosenChar]--;
            let result = target.slice(0, i) + String.fromCharCode(chosenChar + 97);
            
            // Append all remaining characters in ascending order
            for (let c = 0; c < 26; c++) {
                if (count[c] > 0) {
                    result += String.fromCharCode(c + 97).repeat(count[c]);
                }
            }
            return result;
        }
    }

    return "";
};