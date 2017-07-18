function solve(selector) {
    let button = $(selector);

    button.on('click',getText);

    function getText() {
        let content = $('#content');
        let text = Array.from(content.find('strong')).map(e => e.textContent);

        let resultDiv = $('<div>');
        resultDiv.attr('id','summary');
        resultDiv.append("<h2>Summary</h2>");
        resultDiv.append(`<p>${text.join('')}</p>`);
        let holder = content.parent();
        holder[0].appendChild(resultDiv[0]);
    }
}

// solve('#generate');