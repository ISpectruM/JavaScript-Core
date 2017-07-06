function solve(commands) {


    let process = (function () {
        let list = [];

        function add(string) {
            list.push(string);
        }

        function remove(string) {
            list = list.filter(s => s !== string);
        }

        function print() {
            console.log(list.toString());
        }

        return {add, remove, print};
    })();

    for (let command of commands) {
        let tokens = command.split(' ');
        process[tokens[0]](tokens[1]);
    }
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);