/**
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function(s) {
    const n = s.length;
    const first = new Array(26).fill(-1);
    const last = new Array(26).fill(-1);

    for (let i = 0; i < n; i++) {
        const c = s.charCodeAt(i) - 97;
        if (first[c] === -1) first[c] = i;
        last[c] = i;
    }

    const intervals = [];

    // Check potential intervals starting at each character's first appearance
    for (let i = 0; i < 26; i++) {
        if (first[i] === -1) continue;

        let l = first[i];
        let r = last[i];
        let isValid = true;

        for (let j = l; j <= r; j++) {
            const charIdx = s.charCodeAt(j) - 97;
            // If another character inside appears before l, this start is invalid
            if (first[charIdx] < l) {
                isValid = false;
                break;
            }
            r = Math.max(r, last[charIdx]);
        }

        if (isValid) {
            intervals.push([l, r]);
        }
    }

    // Sort intervals by end index to apply greedy interval selection
    intervals.sort((a, b) => a[1] - b[1]);

    const result = [];
    let prevEnd = -1;

    for (const [start, end] of intervals) {
        if (start > prevEnd) {
            result.push(s.slice(start, end + 1));
            prevEnd = end;
        }
    }

    return result;
};