function sort(arr) {

    let result = arr.sort((e1,e2) => compare(e1,e2));

    console.log(result.join("\n"));

    function compare(a, b) {
        if (a.length - b.length !==0){
            return a.length - b.length;
        } else {
            if(a < b){
                return -1;
            } else if (a>b){
                return 1;
            }
            return 0;
        }
    }
}

sort(['alpha', 'beta', 'gamma']);
sort(['test', 'Deny', 'omen', 'Default']);
sort(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']);