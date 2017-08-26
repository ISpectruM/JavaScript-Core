function medenkaWar(arr) {
    let results = {
        'Naskor':0,
        'Vitkor':0
    };

    let naskorLastDamage = 0;
    let naskorCount = 0;

    let vitkorLastDamage = 0;
    let vitkorCount = 0;

    for (let turn of arr) {
        let tokens = turn.split(' ');
        let count = Number(tokens[0]);
        let player = tokens[1];

        fight(player,count);
    }

    function fight(player, count) {
        let currDamage = count * 60;
        switch (player){
            case 'white':
                if (vitkorLastDamage === currDamage){
                    vitkorCount ++;

                    if (vitkorCount === 2){
                        currDamage *= 2.75;
                        vitkorCount = 0;
                    }
                }else{
                    vitkorLastDamage = currDamage;
                    vitkorCount = 1;
                }
                results.Vitkor += currDamage;
                break;
            case 'dark':
                if (naskorLastDamage === currDamage) {
                    naskorCount++;

                    if (naskorCount === 5) {
                        currDamage *= 4.5;
                        naskorCount = 0;
                    }
                } else {
                    naskorCount = 1;
                }
                naskorLastDamage = currDamage;
                results.Naskor += currDamage;
                break;
        }
    }

    let winner = results.Vitkor > results.Naskor ?
        'Vitkor' : 'Naskor';
    console.log(`Winner - ${winner}`);
    console.log(`Damage - ${results[winner]}`);
}
let arr = [
    "2 dark medenkas",
    "1 white medenkas",
    "2 dark medenkas",
    "2 dark medenkas",
    "15 white medenkas",
    "2 dark medenkas",
    "2 dark medenkas"
];

medenkaWar(arr);
