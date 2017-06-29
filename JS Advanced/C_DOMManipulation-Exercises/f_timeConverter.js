function attachEventsListeners() {
    let buttons = document.querySelectorAll('[value=Convert]');

    for (let button of buttons) {
        button.addEventListener('click',calculate)
    }

    function calculate(event) {
        let days = document.getElementById('days');
        let hours = document.getElementById('hours');
        let minutes = document.getElementById('minutes');
        let seconds = document.getElementById('seconds');
        let currValue = 0;

        switch(event.target.getAttribute('id')){
            case 'daysBtn':
                currValue = days.value;
                hours.value = currValue*24;
                minutes.value = currValue*1440;
                seconds.value = currValue*86400;
                break;
            case 'hoursBtn':
                currValue = hours.value;
                days.value = currValue/24;
                minutes.value = currValue*60;
                seconds.value = currValue*3600;
                break;
            case 'minutesBtn':
                currValue = minutes.value;
                days.value = currValue/1440;
                hours.value = currValue/60;
                seconds.value = currValue*60;
                break;
            case 'secondsBtn':
                currValue = seconds.value;
                days.value = currValue/86400;
                hours.value = currValue/3600;
                minutes.value = currValue/60;
                break;
        }
    }
}

