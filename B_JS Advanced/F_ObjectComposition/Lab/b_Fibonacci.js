function getfibonacci() {
        let first = 0;
        let next = 1;

        return function () {
            let current = first + next;
            first = next;
            next = current;
            return first;
        }
}
console.log(getfibonacci());

