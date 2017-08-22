function attachEvents() {
    $('#btnLoadTowns').click(showTowns);

    function showTowns() {
        let towns = $('#towns').val().split(', ');
        let container = document.getElementById('root');

        let context = {
            towns : towns
        };

        let source = document.getElementById('towns-template').innerHTML;
        let template = Handlebars.compile(source);
        container.innerHTML += template(context);
    }
}
