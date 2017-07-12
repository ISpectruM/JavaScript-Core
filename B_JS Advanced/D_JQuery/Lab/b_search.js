function search() {
    let searchText = $('#searchText').val();

    let content = $(`ul#towns li:contains(${searchText})`);
    content.css('font-weight','bold');
    $(`ul#towns li:not(:contains(${searchText}))`).css('font-weight','');
    $('#result').text(`${content.length} matches found.`);
}

