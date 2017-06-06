function agregate(arr) {
    let towns = [];
    let sum = 0;

    for (let row of arr) {
        let currentData = row.split('|').filter(s => s!=='');
        let town = currentData[0].split(' ').filter(s => s!=='');
        let income = currentData[1].split('').filter(s => s!==' ');

        if (town.length > 1){
            town = town.join(" ");
        }
        towns.push(town);
        sum+=Number(income.join(""));
    }

    console.log(towns.join(", "));
    console.log(sum);
}

agregate(['| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']
);
