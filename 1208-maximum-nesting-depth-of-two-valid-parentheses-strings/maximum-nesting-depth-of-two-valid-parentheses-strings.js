/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function(seq) {
    let res = [];
    let depth = 0;
    
    for (let i = 0; i < seq.length; i++) {
        if (seq[i] === '(') {
            depth++;
            // Assign based on parity of the depth
            res.push(depth % 2);
        } else {
            // For ')'
            res.push(depth % 2);
            depth--;
        }
    }
    
    return res;
};