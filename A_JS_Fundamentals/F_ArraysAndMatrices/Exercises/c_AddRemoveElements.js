function addRemove(arr) {
    let number = 1;
    let result = [];

    for (let command of arr) {

        switch (command){
            case 'add':
                result.push(number);
                number++;
                break;
            case 'remove':
                if (result.length > 0){
                    result.pop();
                }
                number++;
                break;
        }
    }

    console.log(result.length>0? result.join('\n'):'Empty');
}

addRemove(['remove','remove','remove']);
