function attachGradientEvents() {
    let gradient = document.getElementById('gradient');
    gradient.addEventListener('mousemove', move);
    gradient.addEventListener('mouseout',out);
    let result = document.getElementById('result')

    function move(event) {
       let location = (event.offsetX / (event.target.clientWidth -1))*100;
       result.textContent = Math.floor(location) + '%';
    }

    function out(event) {
        result.textContent = '';
    }
}
