function sum(arr) {
    let towns = {};

    for (let i = 0; i < arr.length; i+=2) {
        let town = arr[i];
        let value = Number(arr[i+1]);

        if (!towns.hasOwnProperty(town)){
            towns[town] = value;
        } else {
            towns[town] += value;
        }
    }

    console.log(JSON.stringify(towns));
}

sum([
    'Sofia',
    '20',
    'Varna',
    '3',
    'Sofia',
    '5',
    'Varna',
    '4'
]);
