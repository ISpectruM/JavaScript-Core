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

function cookingByNumbers(data) {
    let[start,op1,op2,op3,op4,op5] = [Number(data[0]),data[1],data[2],data[3],data[4],data[5]];
    let chop = (num) => num / 2;
    let dice = (num) => Math.sqrt(num);
    let spice = (num) => num + 1;
    let bake = (num) => num * 3;
    let fillet = (num) => num -(num*20)/100;

    for (let operation of [op1, op2, op3, op4, op5]) {

        switch (operation){
            case 'chop':
                start = chop(start);
                break;
            case 'dice':
                start = dice(start);
                break;
            case 'spice':
                start = spice(start);
                break;
            case 'bake':
                start = bake(start);
                break;
            case 'fillet':
                start = fillet(start);
                break;
        }
        console.log(start);
    }
}

cook(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);
