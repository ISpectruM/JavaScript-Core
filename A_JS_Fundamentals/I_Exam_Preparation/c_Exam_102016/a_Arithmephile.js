function solve(arr) {
    let biggestResult = Number.NEGATIVE_INFINITY;
    for (let input=0 ; input < arr.length ; input++) {
        let num = Number(arr[input]);

        if (num >= 0 && num <10){
            let product = 1;

            if (num === 0){
                continue;
            }

            for (let i = input+1; i <= input+num; i++) {
                product *= arr[i];
            }
            if (biggestResult < product){
             biggestResult = product;
            }
        }
    }
    console.log(biggestResult);
}

solve([ '100', '200', '2', '3', '2', '3', '2', '1', '1' ]);