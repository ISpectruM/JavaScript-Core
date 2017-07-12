function sum() {

    let result = (function () {
        let sum = 0;

        return function add(num) {
            sum += num;
            add.toString = function () {
                return sum;
            };
            return add;
        }
    })();
    console.log(result(1)(2)(-3).toString());
}

sum();