/**
 * @param {string} s
 * @return {number}
 */
var maximumLengthSubstring = function(s) {
    let maxLen = 0;
    let left = 0;
    const count = {};

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        count[char] = (count[char] || 0) + 1;

        // Shrink the window if any character count exceeds 2
        while (count[char] > 2) {
            count[s[left]]--;
            left++;
        }

        // Calculate the maximum length of the valid window
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};