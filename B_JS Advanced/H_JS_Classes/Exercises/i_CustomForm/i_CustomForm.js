let result = (function () {

    class Textbox{
        constructor(selector,regex){
            this._elements = $(selector);
            this.value = $(this._elements[0]).val();
            this._invalidSymbols = regex;
            this.onInput();
        }

        onInput(){
            this.elements.on('input',(event)=> {
                let text = $(event.target).val();
                this.value = text;
            })
        }

        isValid(){
            return !this.value.match(this._invalidSymbols);
        }

        get value() {
            return this._value;
        }

        set value(value) {
            this._value = value;
            for (let el of this._elements) {
                $(el).val(value);
            }
        }

        get elements() {
            return this._elements;
        }
    }

    class Form{
        constructor(){
            this.textboxes = arguments;
            this.element = $('<div class="form">');
        }

        set textboxes(value) {
            for (let obj of value) {
                if (obj.constructor !== Textbox){
                    throw new Error('The object is not of type "Textbox"');
                }
            }
            this._textboxes = value;
        };

        set element(value) {
            this._element = value;
            for (let tbox of this._textboxes) {
                for (let el of tbox.elements) {
                    this._element.append($(el));
                }
            }
        }

        attach(selector){
            let element = $(selector);
            element.append(this._element);
        }

        submit(){
            let allValid = true;

            for (let box of this._textboxes) {
                if (box.isValid()){
                    for (let el of box._elements) {
                        $(el).css('border','2px solid green');
                    }
                }else {
                    for (let el of box._elements) {
                        $(el).css('border',"2px solid red");
                    }
                    allValid = false;
                }
            }
            return allValid;
        }
    }

    return {
        Textbox: Textbox,
        Form: Form
    }
})();

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username",/[^a-zA-Z0-9]/);
let password = new Textbox("#password",/[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username,password);
form.attach("#wrapper");

