function printTriangle(n) {
    for (let i = 1; i<=n; i++){
        printStars(i);
    }

    for (let i=n-1; i>0; i--){
        printStars(i);
    }

    function printStars(n) {
       console.log('*'.repeat(n));
    }
}

printTriangle(5);