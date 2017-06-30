function initializeTable() {
    let link = $('#createLink');
    link.click(addCountry);

    createCountry('Bulgaria', 'Sofia');
    createCountry('Germany', 'Berlin');
    createCountry('Russia', 'Moscow');
    fixLinks();

    function fixLinks() {
        $('table tr a').show();
        $('tr:last-child a:contains("Down")').hide();
        $('tr:eq(2) a:contains("Up")').hide();
    }

    function addCountry() {
        let name = $('#newCountryText');
        let capital = $('#newCapitalText');
        createCountry(name.val(),capital.val());
        name.val('');
        capital.val('');
        fixLinks()
    }

    function createCountry(name, capital){
        let row = $('<tr>')
            .append($(`<td>${name}</td>`))
            .append($(`<td>${capital}</td>`))
            .append($(`<td>`)
                .append($('<a href="#">[Up]</a>').click(moveUp))
                .append($('<a href="#">[Down]</a>').click(moveDown))
                .append($('<a href="#">[Delete]</a>').click(deleteRow))
            );
        row.css('display','none');
        row.appendTo('#countriesTable');
        row.fadeIn();

        function moveUp() {
            let currentRow = $(this).parent().parent();
            currentRow.fadeOut(()=> {
                currentRow.insertBefore(currentRow.prev());
                currentRow.fadeIn();
                fixLinks();
            });
        }

        function moveDown() {
            let currentRow = $(this).parent().parent();
            currentRow.fadeOut(() => {
                currentRow.insertAfter(currentRow.next());
                currentRow.fadeIn();
                fixLinks();
            });
        }

        function deleteRow() {
            let currRow = $(this).parent().parent();
            currRow.fadeOut(() =>{
                currRow.remove();
            });
            fixLinks();
        }
    }
}

