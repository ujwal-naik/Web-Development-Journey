/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {
    let diff = 0;
    let qDiff = 0;
    let l = 0;
    let r = num.length - 1;
    let c = 0;

    while (l < r) {
        c = num.charCodeAt(l++);
        c === 63 ? qDiff++ : (diff += c - 48);

        c = num.charCodeAt(r--);
        c === 63 ? qDiff-- : (diff -= c - 48);
    }

    return (diff * 2 + qDiff * 9) !== 0;
};