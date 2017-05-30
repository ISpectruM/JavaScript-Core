function aggregate(elements) {
    function calculate(elements, start, func) {
        let result = start;
        for (let element of elements) {
            result += func(start, element);
        }
        console.log(result);
    }

    calculate(elements,0,(a,b) => a+b);
    calculate(elements,0,(a,b) => a + 1/b);
    calculate(elements,'',(a,b) => a+b);
}

aggregate([1,2,3,4,5]);