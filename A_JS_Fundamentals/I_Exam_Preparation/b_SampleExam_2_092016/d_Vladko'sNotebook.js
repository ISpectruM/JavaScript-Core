function solve(arr) {
    let players = {};

    //Fill data for players
    for (let tableRow of arr) {
        let tokens = tableRow.split('|');

        fillPlayersStats(tokens);
    }

    //Remove player without name/age, sort opponents, assign rank property
    for (let player in players) {
        let currPlayer = players[player];

        if (currPlayer['name'] === '' ||
            currPlayer['age'] === '') {
            delete players[player];
            continue;
        }

        players[player]['opponents'].sort();

        let rank = (currPlayer['win']) / (currPlayer['loss']);
        currPlayer['rank'] = rank.toFixed(2);
        delete currPlayer['win'];
        delete currPlayer['loss'];
    }

    //Sort object keys
    let sorted = {};
    Object.keys(players)
        .sort((c1,c2)=> c1.localeCompare(c2))
        .forEach(c => {
        sorted[c] = players[c];
    });

    //Print result
    console.log(JSON.stringify(sorted));

    function fillPlayersStats(tokens) {
        let color = tokens[0];
        let secondProperty = tokens[1];
        let value = tokens[2];

        if (!players.hasOwnProperty(color)) {
            players[color] = {
                'age': '',
                'name': '',
                'opponents':[],
                'win': 1,
                'loss': 1,
            };
        }

        switch (secondProperty){
            case 'age':
                players[color]['age'] = value;
                break;
            case 'name':
                players[color]['name'] = value;
                break;
            default:
                players[color][secondProperty] = players[color][secondProperty]+1;
                players[color]['opponents'].push(value);
                break;
        }
    }
}

solve([
    "red|age|44",
    "blue|win|pesho",
    "blue|win|mariya",
    "purple|loss|Kiko",
    "purple|loss|Kiko",
    "purple|loss|Kiko",
    "purple|loss|Yana",
    "purple|loss|Yana",
    "purple|loss|Manov",
    "purple|loss|Manov",
    "red|name|gosho",
    "purple|age|99",
    "blue|win|Vladko",
    "purple|loss|Yana",
    "purple|name|VladoKaramfilov",
    "blue|age|21",
    "blue|loss|Pesho"
]);
