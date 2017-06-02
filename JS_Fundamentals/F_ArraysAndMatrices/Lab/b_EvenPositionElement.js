function evenPosition(arr) {
    let result = [];
    for (let element in arr) {
        if (element % 2 === 0){
            result.push(arr[element]);
        }
    }

    console.log(result.join(' '));
}

evenPosition(['20', '30', '40']);