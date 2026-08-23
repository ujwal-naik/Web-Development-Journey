/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {
    let diff = 0;
    let qDiff = 0;
    let l = 0;
    let r = num.length - 1;

    while (l < r) {
        const c1 = num.charCodeAt(l);
        if (c1 === 63) { // '?' is ASCII 63
            qDiff++;
        } else {
            diff += c1 - 48; // '0' is ASCII 48
        }

        const c2 = num.charCodeAt(r);
        if (c2 === 63) {
            qDiff--;
        } else {
            diff -= c2 - 48;
        }

        l++;
        r--;
    }

    return (2 * diff + 9 * qDiff) !== 0;
};