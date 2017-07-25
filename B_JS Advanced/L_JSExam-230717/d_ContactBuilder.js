class Contact{
    constructor(firstName, lastName, phone ,email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.online = false;
        this.titleBar = this.createTitle;
        this.infoBar = this.createInfoBar;
        this.button = this.createButton;
    }


    get titleBar() {
        return this._titleBar;
    }

    set titleBar(value) {
        this._titleBar = value;
    }

    get button() {
        return this._button;
    }

    set button(value) {
        this._button = value;
    }

    get infoBar() {
        return this._infoBar;
    }

    set infoBar(value) {
        this._infoBar = value;
    }

    set online(value) {
        if (value){
            $(this._titleBar).addClass('online');
        } else {
            $(this._titleBar).removeClass('online');
        }
        this._online = value;
    }

    get online() {
        return this._online;
    }


    get createButton(){
        let button = $('<button>');
        button.html('&#8505;');

        return button;
    }

    get createTitle() {
        let title = $('<div>');
        title.addClass('title');
        title.text(`${this.firstName} ${this.lastName}`);
        return title;
    }

    get createInfoBar(){
        let info = $('<div>');
        info.addClass('info');
        info.html(`<span>&phone; ${this.phone}</span>`+
            `<span>&#9993; ${this.email}</span>`);

        return info;
    }


    render(id){
        $(this._titleBar).append(this._button);
        this._button.click(()=>{$(this._infoBar).toggle();}
        );

        $(this._infoBar).css("display","none");

        let article = $('<article>')
            .append(this._titleBar)
            .append(this._infoBar);

        let main = $(`#${id}`);
            main.append(article);
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];
contacts.forEach(c => c.render('main'));

// After 1 second, change the online status to true
setTimeout(() => contacts[1].online = true, 2000);
