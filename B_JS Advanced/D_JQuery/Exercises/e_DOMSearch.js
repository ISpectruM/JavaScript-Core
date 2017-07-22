function domSearch(container,isCaseSensitive) {
    let formContainer = $(container);
    createAddControls();
    createSearchControls();
    createResultControls();

    let addBtn = $('.button');
    addBtn.on('click', add);

    $('.search-controls input').on('input',searchForMatch);

    function searchForMatch() {
        let input = $(this);
        let results = $('li.list-item strong');
        let inputVal = input.val();

        for (let el of $(results)) {
            let text = el.textContent;
            if (!isCaseSensitive){
                inputVal = inputVal.toLowerCase();
                text = text.toLowerCase();
            }
            if (!(text).includes(inputVal)){
                $(el).closest('li').css('display','none');
            } else {
                $(el).closest('li').css('display', '');
            }
        }
    }

    function add() {
        let content = $('.add-controls input');
        appendLi(content);
        content.val("");
    }

    function appendLi(content) {
        let li = $('<li>');
        li.addClass("list-item");
        $('<a class="button">X</a>').click(deleteItem).appendTo(li);
        $(`<strong>${content.val()}</strong>`).appendTo(li);
        $('.result-controls ul').append(li);
    }

    function deleteItem() {
        $(this).closest('li').remove();
    }

    function createAddControls() {
        let addControlsDiv = $('<div>');
        addControlsDiv.addClass("add-controls");

        let labelTag = $('<label>');
        labelTag.text("Enter text: ");
        labelTag.append($('<input>'));
        labelTag.appendTo(addControlsDiv);

        let anchor = $('<a>Add</a>');
        anchor.addClass("button");
        anchor.css('display', 'inline-block');
        anchor.appendTo(addControlsDiv);

        formContainer.append(addControlsDiv);
    }
    
    function createSearchControls() {
        let controlsDiv = $('<div>');
        controlsDiv.addClass("search-controls");

        let labelTag = $('<label>');
        labelTag.text("Search: ");
        labelTag.append($('<input>'));
        labelTag.appendTo(controlsDiv);

        formContainer.append(controlsDiv);
    }

    function createResultControls() {
        let controlsDiv = $('<div>');
        controlsDiv.addClass("result-controls");

        let ulTag = $('<ul>');
        ulTag.addClass("items-list");
        ulTag.appendTo(controlsDiv);

        formContainer.append(controlsDiv);
    }
}

