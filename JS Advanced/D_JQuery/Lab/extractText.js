function extractText() {
    let result = $('#items li').toArray().map(e => e.textContent).join(', ');
    $('#result').text(result);
}

