function search() {
    let searchText = $('#searchText').val();

    let content = $(`ul#towns li:contains(${searchText})`);
    content.css('font-weight','bold');
    $('#result').text(`${content.length} matches found.`);
}

