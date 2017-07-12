function printBinaryLogarithm(numbers) {
    for (let number of numbers){
        console.log(Math.log2(number));
    }
}

printBinaryLogarithm([1024,1048576,256,1,2,50,100]);
