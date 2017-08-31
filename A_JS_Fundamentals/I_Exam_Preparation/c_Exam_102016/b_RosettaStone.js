function solve(arr) {
    let patternSize = Number(arr.shift());
    let pattern = [];

    //Fill pattern matrix
    for (let row = 0; row < patternSize; row++) {
        pattern[row] = arr.shift().split(' ').map(s => Number(s));
    }

    //Fill message matrix
    let message = arr.map(row => row.split(' ').map(s => Number(s)));

    //Decipher message matrix
    for (let row = 0; row < message.length; row += patternSize ) {
        for (let col = 0; col < message[row].length; col += pattern[0].length) {

            for (let patRow = 0; patRow < patternSize && row + patRow < message.length; patRow++) {
                for (let patCol = 0; patCol < pattern[0].length && (col + patCol) < message[row].length; patCol++) {
                    let patCell = pattern[patRow][patCol];
                    let messageCell = message[row + patRow][col + patCol];
                    let decipherNum = (patCell + messageCell) % 27;
                    if (decipherNum === 0) {
                        message[row + patRow][col + patCol] = ' ';
                    } else {
                        message[row + patRow][col + patCol] = String.fromCharCode(decipherNum + 64);
                    }
                }
            }
        }
    }

    //Print message
    let result='';
    message.forEach((k)=> {
        k.forEach(w => {
            result += w;
        })
    });
    console.log(result);
}

solve([
    "1",
    "1 3 13",
    "12 22 14 13 25 0 4 24 23",
    "18 24 2 25 22 0 0 11 18",
    "8 25 6 26 8 23 13 4 14",
    "14 3 14 10 6 1 6 16 14",
    "11 12 2 10 24 2 13 24 0",
    "24 24 10 14 15 25 18 24 12",
    "4 24 0 8 4 22 19 22 14",
    "0 11 18 26 1 19 18 13 15",
    "8 15 14 26 24 14 26 24 14]"]
);
