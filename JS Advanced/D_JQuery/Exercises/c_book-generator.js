function createBook(selector, bookTitle, authorName, isbn) {

    let bookGenerator = (function (){
        let id = 1;
        return function (selector, bookTitle, authorName, isbn) {
            let wrapper = $(selector);
            let book = $('<div>');
            book.attr("id",`book${id}`);
            book.css("border","none");

            $(`<p class="title">${bookTitle}</p>`).appendTo(book);
            let authorP = $(`<p class="author">${authorName}</p>`);
            book.append(authorP);
            let isbNumP = $(`<p class="isbn">${isbn}</p>`);
            book.append(isbNumP);

            let selectBtn = $('<button>Select</button>');
            let deselectBtn = $('<button>Deselect</button>');


            selectBtn.click(selectBook);
            deselectBtn.click(deselectBook);

            function selectBook() {
                book.css("border", "2px solid blue");
            }

            function deselectBook() {
                book.css("border", "none");
            }

            book.append(selectBtn);
            book.append(deselectBtn);
            wrapper.append(book);

            id++;
        };
    }());

    bookGenerator(selector,bookTitle,authorName,isbn);
}
