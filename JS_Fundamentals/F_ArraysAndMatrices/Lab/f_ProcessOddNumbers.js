function processOddNumbers(arr) {
    let result = arr => arr.filter((e,i) => i%2 !==0 )
        .map(e => e*2)
        .reverse()
        .join(" ");

    console.log(result(arr));
}

processOddNumbers([3, 0, 10, 4, 7, 3]);
