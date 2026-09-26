/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function(s, knowledge) {
    const map = new Map(knowledge);
    let result = [];
    let i = 0;
    const n = s.length;

    while (i < n) {
        if (s[i] === '(') {
            i++; // skip '('
            let key = '';
            while (i < n && s[i] !== ')') {
                key += s[i];
                i++;
            }
            i++; // skip ')'
            
            // Append value from map or '?' if not found
            result.push(map.has(key) ? map.get(key) : '?');
        } else {
            result.push(s[i]);
            i++;
        }
    }

    return result.join('');
};