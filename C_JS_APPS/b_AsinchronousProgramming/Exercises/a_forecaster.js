function attachEvents() {
    const url = 'https://judgetests.firebaseio.com';
    const forecastContainer = $('#forecast');
    const currentResult = $('#current');
    const upcomingResult = $('#upcoming');


    $('#submit').click(getLocations);
    let input = $('#location');

    function request(endPart) {
        return $.ajax({
            url: url + endPart,
            method: "GET"
        })
    }

    function getLocations() {
        request('/locations.json')
            .then(displayPrognoses)
            .catch(catchError);
    }

    function displayPrognoses(data) {
        let location = input.val();
        input.val('');
        let prognosesCode = data.filter(p => p.name === location)
            .map(k => k.code)[0];

        let currConditions = request(`/forecast/today/${prognosesCode}.json`);
        let weatherForecast = request(`/forecast/upcoming/${prognosesCode}.json`);
        Promise.all([currConditions, weatherForecast])
            .then(displayResults)
            .catch(catchError);
    }

    function displayResults([current, forecast]) {
        let symbols = {
            "Sunny": '&#x2600',
            "Partly sunny": '&#x26C5',
            "Overcast": '&#x2601',
            "Rain": '&#x2614',
            "Degrees": '&#176'
        };

        currentResult.find('span').detach();
        upcomingResult.find('span').detach();

        //Create current prognosis
        let condition = current.forecast.condition;
        currentResult.append($('<span>').addClass('condition symbol')
            .html(symbols[condition]));
        currentResult.append(createCurrentWeather(current, condition));

        //Create forecast
        for (let day of forecast.forecast) {
            upcomingResult.append(createForecast(symbols, day));
        }

        forecastContainer.css('display', 'inline-block');
    }

    function createCurrentWeather(current, condition) {
        let conditionData = $('<span>').addClass('condition');
        let data = current.forecast;
        let location = current.name;

        $('<span>').addClass('forecast-data').text(location)
            .appendTo(conditionData);
        $('<span>').addClass('forecast-data')
            .html(`${data.low}&#176/${data.high}&#176`)
            .appendTo(conditionData);
        $('<span>').addClass('forecast-data').text(condition)
            .appendTo(conditionData);

        return conditionData;
    }

    function createForecast(symbols, day) {
        let upcoming = $('<span>').addClass('upcoming');

        $('<span>').addClass('symbol').html(symbols[day.condition])
            .appendTo(upcoming);
        $('<span>').addClass('forecast-data')
            .html(`${day.low}&#176/${day.high}&#176`)
            .appendTo(upcoming);
        $('<span>').addClass('forecast-data').text(day.condition)
            .appendTo(upcoming);

        return upcoming;
    }

    function catchError(err) {
        forecastContainer.text('Error');
    }
}
