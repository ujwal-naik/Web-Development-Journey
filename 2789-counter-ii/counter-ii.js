/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    let Counter = init;
    return {
        increment:function(){
            Counter += 1;
            return Counter;
        },
        reset:function(){
            Counter = init;
            return Counter;
        },
        decrement:function(){
            Counter -= 1;
            return Counter;
        },  

    } 
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */