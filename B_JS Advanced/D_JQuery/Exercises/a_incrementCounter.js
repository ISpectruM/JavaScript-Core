function increment(element) {
    $(`${element}`)
        .append($('<textarea class="counter" disabled="true">0</textarea>'))
        .append($('<button class="btn" id="incrementBtn">Increment</button>')
            .click(incrementElement))
        .append($('<button class="btn" id="addBtn">Add</button>')
            .click(add))
        .append($('<ul class="results"></ul>'));

    function incrementElement() {
        let value = $(this).prev();
        value.text(Number(value.text())+1);
    }
    
    function add() {
        $('.results').append(`<li>${$("textarea").text()}</li>`);
    }
}

