function tableBuilder(selector) {
    let table = $('<table>');
    return {
        createTable(columnNames){
            $(selector).children().remove();
            let tableRow = $('<tr>');
            for (let name of columnNames){
                tableRow.append($('<th>').text(name));
            }
            tableRow.append($('<th>').text('Action'));
            table.append(tableRow);
            $(selector).append(table);
        },
        fillData(dataRows){
            for (let row = 0; row < dataRows.length; row++) {
                let tableRow = $('<tr>');
                for (let col = 0; col < dataRows[row].length; col++) {
                    tableRow.append($('<td>').text(dataRows[row][col]));
                }
                tableRow.append($('<td>').append( $('<button>').text('Delete').click((event)=>{
                    let row = event.target.parentNode;
                    $(row.parentNode).remove();
                })));
                table.append(tableRow);
            }
        }
    }
}
