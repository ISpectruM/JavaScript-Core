function removeX(arr) {
    let result = [];
    let temp = [];

    //Fill the  matrix
    for (let i = 0; i < arr.length; i++) {
        result[i] = arr[i].split('');
        temp[i] = new Array(result[i].length);
    }
    //Get the x positions
    for (let row = 1; row < result.length - 1; row++) {
        for (let col = 1; col < result[row].length; col++) {
            try {
                let string = result[row][col].toLowerCase();
                let upLeft = result[row - 1][col - 1].toLowerCase();
                let upRight = result[row - 1][col + 1].toLowerCase();
                let bottomLeft = result[row + 1][col - 1].toLowerCase();
                let bottomRight = result[row + 1][col + 1].toLowerCase();

                if (string === upLeft &&
                    string === upRight &&
                    string === bottomLeft &&
                    string === bottomRight) {
                    temp[row][col] = 1;
                    temp[row - 1][col - 1] = 1;
                    temp[row - 1][col + 1] = 1;
                    temp[row + 1][col - 1] = 1;
                    temp[row + 1][col + 1] = 1;
                }
            }catch(e){}
        }
    }

    //Remove the x elements
    temp.forEach((row,rowIndex) => {
        row.forEach((col,colIndex) => {
            if (col === 1){
                result[rowIndex][colIndex]=1;
            }
        });
    });

    result = result.forEach((row) => {
        row = row.filter(e => e!==1);
        console.log(row.join(''));
    });
}

removeX([
    "abnbjbd",
    "xoBab",
    "Abmbhb",
    "aabab",
    "ababvvvv"
]);
