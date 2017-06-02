function processOddNumbers(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let newElement = 0;
        if (i % 2 !== 0){
            newElement = arr[i]*2;
            result.unshift(newElement);
        }
    }

    console.log(result.join(" "));
}

processOddNumbers([3, 0, 10, 4, 7, 3]);
