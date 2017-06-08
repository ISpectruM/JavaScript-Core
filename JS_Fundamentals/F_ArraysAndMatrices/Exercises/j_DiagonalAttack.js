function checkDiagonals(matrix) {
    let firstDiagSum = 0;
    let secondaryDiagSum = 0;
    matrix = matrix.map(str => str.split(' ').map(str => Number(str)));

    matrix.forEach(
        (row,index) => {
            row.forEach(
                (e,colIndex) => {
                    if(index === colIndex){
                        firstDiagSum += e;
                    }
                })
        });

    matrix.forEach(
        (row,index) => {
            row.forEach(
                (e,colIndex) => {
                    if(index + colIndex === matrix.length-1){
                        secondaryDiagSum += e;
                    }
                })
        });

    if (firstDiagSum === secondaryDiagSum){
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if(row !== col && row+col !== matrix.length-1){
                    matrix[row][col] = firstDiagSum;
                }
            }
        }
    }
    matrix.forEach(row => {
        console.log(row.join(' '));
    });
}

checkDiagonals(['1 1 1',
    '1 1 1',
    '1 1 0']
);