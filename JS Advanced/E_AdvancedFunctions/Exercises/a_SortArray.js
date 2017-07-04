function solve(arr, sorting) {
    
    let sortAscending = function(a,b) {
        return a-b;
    };

    let sortDescending = function (a, b) {
        return b-a;
    };

    let sortingStrategies = {
        "asc": sortAscending,
        "desc": sortDescending
    };

    return arr.sort(sortingStrategies[sorting]);
}

solve([14, 7, 17, 6, 8], 'desc');
