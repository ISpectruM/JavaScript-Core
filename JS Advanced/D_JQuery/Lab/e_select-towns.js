function attachEvents() {
    $('#items li').click(click);

    function click() {
        let currButton = $(this);
        if (currButton.attr('data-selected')){
            currButton.removeAttr('data-selected');
            currButton.removeAttr('style');

        } else {
            currButton.attr('data-selected','true');
            currButton.css('backgroundColor', '#DDD');
        }
    }

    $('#showTownsButton').click(showSelected);

    function showSelected() {
        let towns;
        towns = $("li[data-selected='true']")
            .toArray()
            .map(e => e.textContent)
            .join(', ');
        $('#selectedTowns').text(`Selected towns: ${towns}`);
    }
}

