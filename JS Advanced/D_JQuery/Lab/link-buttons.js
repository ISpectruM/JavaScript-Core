function attachEvents() {
    $('.button').on('click',push);

    function push() {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
    }
}

