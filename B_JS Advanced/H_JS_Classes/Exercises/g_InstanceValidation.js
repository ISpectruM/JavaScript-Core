class CheckingAccount{
    constructor(clientId, email, firstName, lastName){
        this.products = [];
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    set clientId(value) {
        if(!Number.isInteger(Number(value)) ||
            value.length > 6 ||
            value.length < 6){
            throw new TypeError("Client ID must be a 6-digit number");
        }
        return value;
    }

    set email(value) {
        let regex = /^[\da-zA-Z+]+@[a-zA-Z.]+$/;
        if (!value.match(regex)){
            throw new TypeError("Invalid e-mail");
        }
        this._email = value;
    }

    set firstName(value) {
        if (value.length < 3 ||
        value.length > 20){
            throw new TypeError(`First name must be between 3 and 20 characters long`)
        }
        let regex = /^[a-zA-Z]{3,20}$/;
        if(!value.match(regex)){
            throw new TypeError(`First name must contain only Latin characters`)
        }
        this._firstName = value;
    }

    set lastName(value) {
        if (value.length < 3 ||
            value.length > 20){
            throw new TypeError(`Last name must be between 3 and 20 characters long`)
        }
        let regex = /^[a-zA-Z]{3,20}$/;
        if(!value.match(regex)){
            throw new TypeError(`Last name must contain only Latin characters`)
        }
        this._lastName = value;
    }
}

let acc = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov');