
class TitleBar{
    constructor(title){
        this.title = title;
        this.menu = $('<nav>');
    }

    addLink(href, name){
        let link = $('<a>')
            .addClass("menu-link")
            .attr('href',`${href}`)
            .text(`${name}`);
        this.menu.append(link);
    }

    appendTo(selector){
        let container = $(selector);
        let drawer = $('<div>').addClass("drawer");

        //Create header row with content
        let headerRow = $('<div>');
        headerRow.addClass("header-row");

        let button = $('<a>&#9776;</a>');
        button.addClass("button");
        button.click(()=>$(drawer).toggle());
        let title = $(`<span>`);
        title.addClass('title');
        title.text(`${this.title}`);

        headerRow.append(button);
        headerRow.append(title);

        //Fill drawer with menu content
        drawer.css('display','none');
        this.menu.addClass("menu");
        drawer.append(this.menu);

        //Create header and append to container
        let header = $('<header>').addClass("header");
        header.append(headerRow);
        header.append(drawer);
        container.append(header);
    }
}

(function () {
    let header = new TitleBar('Title Bar Problem');
    header.addLink('/', 'Home');
    header.addLink('about', 'About');
    header.addLink('results', 'Results');
    header.addLink('faq', 'FAQ');
    header.appendTo('#container');
})();
