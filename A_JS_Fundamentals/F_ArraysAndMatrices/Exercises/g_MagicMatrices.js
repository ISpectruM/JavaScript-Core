function isMagic(matrix) {

    console.log(checkCol(matrix)&&checkRow(matrix));

    function checkCol(matrix) {
        let currSum = 0;
        for (let col = 0; col < matrix[0].length; col++){
            let colSum = 0;
            for (let row = 0; row < matrix.length; row++){
                colSum += matrix[col][row];
            }
            if(col === 0){
                currSum = colSum;
            } else if (currSum !== colSum){
                return false
            }
        }
        return true;
    }

    function checkRow(matrix) {
        let currSum = 0;

        for (let row = 0; row < matrix.length; row++) {
            let rowSum = 0;
            for (let col = 0; col < matrix[row].length; col++) {
                rowSum += matrix[row][col];
            }
            if(row ===0){
                currSum = rowSum;
            } else if (currSum !== rowSum){
                return false
            }
        }
        return true;
    }
}

isMagic([[4, 5, 6],
        [6, 5, 4],
        [5, 5, 5]]);
isMagic([[11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]]
);
isMagic([[1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]]
);
