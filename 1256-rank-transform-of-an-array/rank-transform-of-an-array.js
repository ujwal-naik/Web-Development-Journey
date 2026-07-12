/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function(arr) {
    const sortedUnique = [...new Set(arr)].sort((a,b)=>a-b);

    const rankMap = new Map();
    sortedUnique.forEach((num, index)=>{
        rankMap.set(num,index+1);
    });
    return arr.map(num=> rankMap.get(num));
};