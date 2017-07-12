function printRectangle(rows = 5) {

    function printStars(n = rows) {
        console.log('*' + ' *'.repeat(n-1));
    }

    for (let i=1; i<=rows; i++){
        printStars(rows);
    }
}

printRectangle(3);