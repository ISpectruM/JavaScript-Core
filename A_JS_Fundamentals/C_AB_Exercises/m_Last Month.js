function lastMonth(date) {
    let month = date[1];
    let year = date[2];
    let days=0;

    switch (month){
        case 1:
        case 2:
        case 4:
        case 6:
        case 8:
        case 9:
        case 11:
            days = 31;
            break;
        case 3:
            if (((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)){
                days = 29;
            }else {
                days = 28;
            }
            break;
        case 5:
        case 7:
        case 10:
        case 12:
            days = 30;
            break;
    }

    console.log(days);
}

lastMonth([17, 1, 2002]);