
function factorial(n){
    if (n < 0) {
        throw new Error('Factorial is only defined for positive integer numbers.')
    } else if (n === 0) {
        return 1;
    } else {
        return factorial(n - 1) * n;
    }
}

function product(n, term = k => k, initial=1){
    let result = 1
    if(n<=0){
        throw new Error("n must be >= 0")
    }
    else if(initial>n){
        throw new Error("initial must be <= n")
    }
    else{
        while(initial<=n){
            result *= term(initial)
            initial++
        }
        return result;
    }
    // todo: implement the product `term(initial) * term(initial + 1) * term(initial + 2) * ... * term(initial + d)` with initial + d <= n
}

export {factorial, product}