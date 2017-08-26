function solve(arr) {
    let hangar = fillMatrix();
    let coordinates = arr[arr.length - 1].split(' ');
    let bunnieDamage = 0;
    let enemyKilled = 0;

    //Explode bomb buddies
    explode();
    killTheRest();

    function killTheRest() {
        for (let row of hangar) {
            bunnieDamage += row.map(e => {
                if (e !== 0) enemyKilled++;
                return e
            }).reduce((e1, e2) => e1 + e2);
        }
    }

    function explode() {
        for (let point of coordinates) {
            let tokens = point.split(',');
            let rowCoords = Number(tokens[0]);
            let colCoords = Number(tokens[1]);
            let power = hangar[rowCoords][colCoords];
            if (power === 0) {
                continue;
            }
            bunnieDamage += power;
            enemyKilled++;

            for (let row = rowCoords - 1; row <= rowCoords + 1; row++) {
                if (row < 0 || row > hangar.length - 1) continue;
                for (let col = colCoords - 1; col <= colCoords + 1; col++) {
                    if (col < 0 || col > hangar[0].length - 1) continue;
                    hangar[row][col] -= power;
                    if (hangar[row][col] < 0) {
                        hangar[row][col] = 0;
                    }
                }
            }
        }
    }

    function fillMatrix() {
        let matrix = [];
        for (let row = 0; row < arr.length - 1; row++) {
            matrix[row] = arr[row]
                .split(' ')
                .map(num => Number(num));
        }
        return matrix;
    }

    console.log(bunnieDamage);
    console.log(enemyKilled);
}

solve([
    "5 10 15 20",
    "10 10 10 10",
    "10 15 10 10",
    "10 10 10 10",
    "2,2 0,3"
]);

