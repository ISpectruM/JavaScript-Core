function printElement(arr) {
    let step = Number(arr.pop());

    for (let i = 0; i < arr.length; i+=step) {
        if (arr[i]!== undefined){
            console.log(arr[i]);
        }
    }
}

printElement([5, 20, 31, 4, 20, 2]);
printElement(['dsa', 'asd', 'test', 'tset', '2']);
