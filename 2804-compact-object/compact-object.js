/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)){
        return obj
            .map(compactObject)
            .filter(Boolean);
    }
    const compacted = {};
    for(const key in obj ){
        let value = compactObject(obj[key]);
        if (Boolean(value)){
            compacted[key] = value;
        }
    }
    return compacted;

};