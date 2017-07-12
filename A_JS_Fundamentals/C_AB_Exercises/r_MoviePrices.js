function moviePrice(strings) {
    let movie = strings[0].toLowerCase();
    let day = strings[1].toLowerCase();
    let price = 'error';

    if (movie === 'schindler\'s list' || movie === 'casablanca' || movie === 'the wizard of oz'){
        switch (day){
            case 'monday':
            case 'tuesday':
            case 'wednesday':
            case 'thursday':
            case 'friday':
                if (movie === 'schindler\'s list'){
                    price = '8.50';
                } else if(movie === 'casablanca'){
                    price = '8';
                } else if (movie === 'the wizard of oz') {
                    price = '10';
                }
                break;
            case 'saturday':
            case 'sunday':
                if (movie === 'schindler\'s list' || movie === 'the wizard of oz'){
                    price = '15';
                } else if(movie === 'casablanca') {
                    price = '10';
                }
                break;
        }
    } else if (movie === 'the godfather'){
        switch (day){
            case 'monday':
                price = '12';
                break;
            case 'tuesday':
                price = '10';
                break;
            case 'wednesday':
            case 'friday':
                price = '15';
                break;
            case 'thursday':
                price = '12.50';
                break;
            case 'saturday':
                price = '25';
                break;
            case 'sunday':
                price = '30';
                break;
        }
    }
    console.log(price);
}

moviePrice(['The Godfather','Nineday']);