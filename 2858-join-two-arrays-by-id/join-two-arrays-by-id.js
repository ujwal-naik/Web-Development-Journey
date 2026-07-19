/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function(arr1, arr2) {
    const resultObj = {};

    for (const item of arr1 ){
        resultObj[item.id]= item;
    }

    for (const item of arr2){
        if (resultObj[item.id]){
            resultObj[item.id] = {...resultObj[item.id], ...item};
        }else {
            resultObj[item.id] = item;
        }
    }
    return Object.values(resultObj).sort((a,b)=> a.id - b.id);
};