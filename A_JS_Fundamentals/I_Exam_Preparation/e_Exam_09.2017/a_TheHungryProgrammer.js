function solve(meals, commands) {
    let eatenCount = 0;
    if (commands.length > 0) {
        for (let strings of commands) {
            let command = strings.split(' ');

            if (command[0] === 'End') break;

            switch (command[0]) {
                case 'Serve':
                    if (meals.length > 0) {
                        console.log(`${meals.pop()} served!`);
                    }
                    break;
                case 'Eat':
                    if (meals.length > 0) {
                        console.log(`${meals.shift()} eaten`);
                        eatenCount++;
                    }
                    break;
                case 'Shift':
                    if (command.length < 3 && meals.length < 2) {
                        break;
                    } else {
                        shiftMeals(command);
                    }
                    break;
                case 'Add':
                    if (command.length < 2) {
                        break;
                    } else {
                        addPortion(command);
                    }
                    break;
                case 'Consume':
                    if (command.length < 3 && meals.length === 0) {
                        break;
                    } else {
                        consumeFoods(command);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    if (meals.length === 0){
        console.log('The food is gone');
    } else {
        console.log('Meals left: ' + meals.join(', '));
    }
    console.log('Meals eaten: ' + eatenCount);

    function shiftMeals(command) {
        let firstIndex = Number(command[1]);
        let secIndex = Number(command[2]);

        if (firstIndex >= 0 && firstIndex < meals.length &&
        secIndex >= 0 && secIndex < meals.length){

            let temp = meals[firstIndex];
            meals[firstIndex] = meals[secIndex];
            meals[secIndex] = temp;
        }
    }

    function addPortion(command) {
        let portion = command[1];
        if(portion !== undefined){
            meals.unshift(portion);
        }
    }

    function consumeFoods(command) {
        let firstIndex = Number(command[1]);
        let secIndex = Number(command[2]);

        if (firstIndex >= 0 && firstIndex < meals.length &&
            secIndex >= 0 && secIndex < meals.length) {

            meals = meals.filter((meal, i) => {
                if(i < firstIndex || i > secIndex) return meal;
            });
            eatenCount += secIndex-firstIndex + 1;
            console.log('Burp!');
        }
    }
}

solve(['carrots', 'apple', 'beet'],
    ['Consume 0 2',
        'End',]


);
