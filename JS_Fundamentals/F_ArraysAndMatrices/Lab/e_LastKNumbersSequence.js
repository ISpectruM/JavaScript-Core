function sumLastKNumbers(count, nums) {
    let result = [];
    result[0] = 1;
    let sum = 0;

    for (let i = 0; i < count; i++) {
        let arr = result.slice(Math.max(0,i-nums));
        arr.forEach((e)=> sum +=e);
        result[i]=sum;
        sum = 0;
    }
    console.log(result.join(" "));

}

sumLastKNumbers(8,2);
