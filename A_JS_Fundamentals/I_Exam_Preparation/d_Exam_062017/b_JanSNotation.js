function solve(arr) {
    const operandsError = "Error: too many operands!";
    const noOperandsError = "Error: not enough operands!";
    let numbers = [];

    for (let element of arr) {

        if (Number(element)){
            numbers.push(element);
        } else {
            if (numbers.length < 2) {
                console.log(noOperandsError);
                if (numbers.length === 1) numbers.pop();
                break;
            } else {
                let num2 = numbers.pop();
                let num1 = numbers.pop();
                let result = 0;

                switch(element){
                    case '+':
                        result = num1 + num2;
                        break;
                    case "-":
                        result = num1 - num2;
                        break;
                    case "*":
                        result = num1 * num2;
                        break;
                    case "/":
                        result = num1 / num2;
                        break;
                }
                numbers.push(result);
            }
        }
    }

    if(numbers.length > 1){
        console.log(operandsError);
    } else if (numbers.length === 1){
        console.log(numbers.pop());
    }
}

solve([-1,
    1,
    '+',
    101,
    '*',
    18,
    '+',
    3,
    '/']

);
