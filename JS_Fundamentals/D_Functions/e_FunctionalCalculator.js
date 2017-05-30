function calculator(a, b, op) {

    let add = function(a,b) {
        return a+b;
    };
    let subtract = function (a, b) {
        return a-b;
    };
    let multiply = function (a, b) {
        return a*b;
    };
    let divide = function (a, b) {
        return a/b;
    };

    function calculate(a, b, operation) {
        return operation(a,b);
    }

    switch (op){
        case '+':
            return calculate(a,b,add);
        case '-':
            return calculate(a,b,subtract);
        case '*':
            return calculate(a,b,multiply);
        case '/':
            return calculate(a,b,divide);
    }
}
