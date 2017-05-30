function radar(data) {
    let speed = data[0];
    let area = data[1];
    let exceeding = getExceeding(speed,area);

    if (exceeding > 0 && exceeding <= 20 ){
        console.log('speeding');
    } else if (exceeding > 20 && exceeding <=40){
        console.log('excessive speeding');
    } else if (exceeding > 0){
        console.log('reckless driving');
    }

    function getExceeding(spd,way){
        switch (way){
            case 'motorway':
                return calculateExceeding(spd,130);
            case 'interstate':
                return calculateExceeding(spd, 90);
            case 'city':
                return calculateExceeding(spd,50);
            case 'residential':
                return calculateExceeding(spd,20);
        }
    }

    function calculateExceeding(spd,limit) {
        if (spd > limit){
            return spd - limit;
        }
        return 0;
    }
}

function policeRadar(data) {
    let speed = data[0];
    let area = data[1];
    let limit = getSpeedLimit(area);
    let infraction = getInfraction(speed,limit);

    if (infraction){
        console.log(infraction);
    }

    function getInfraction(speed, limit) {
        let infraction = speed - limit;
        if (infraction < 0){
            return false;
        } else {
            if (infraction > 0 && infraction <= 20 ){
                return 'speeding';
            } else if (infraction > 20 && infraction <=40){
                return 'excessive speeding';
            } else {
                return 'reckless driving';
            }
        }
    }

    function getSpeedLimit(zone) {
        switch (zone){
            case 'motorway':
                return 130;
            case 'interstate':
                return 90;
            case 'city':
                return 50;
            case 'residential':
                return 20;
        }
    }
}

policeRadar([200, 'motorway']);
