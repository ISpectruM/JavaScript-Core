function cook(data) {
    let result = Number(data[0]);

    for (let i = 1; i < data.length; i++) {
        let operation = data[i];
        result = getResult(result, operation, calculate);
        console.log(result);
    }

    function getResult(result, oper, calc) {
        return calc(result, oper);
    }

    function calculate(num, oper) {
        switch (oper){
            case 'chop':
                return num /2;
            case 'dice':
                return Math.sqrt(num);
            case 'spice':
                return num + 1;
            case 'bake':
                return num * 3;
            case 'fillet':
                return num - (num*20)/100;
        }
    }
}

cook(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);
