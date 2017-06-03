function equalNeighbors(matrix) {
    let count = 0;

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            let currentElement = matrix[row][col];

            if (matrix[col+1] !== undefined && currentElement === matrix[row][col+1]){
                count++;
            }

            if (matrix[row+1] !== undefined && currentElement === matrix[row+1][col]){
                count ++;
            }
        }
    }
    console.log(count);
}
