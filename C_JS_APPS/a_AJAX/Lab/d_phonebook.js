$(()=>{
    let url = 'https://phonebook-9d903.firebaseio.com/Phonebook';
    let inputName = $('#person');
    let inputPhone = $('#phone');

    $('#btnLoad').click(loadContacts);
    $('#btnCreate').click(addContact);

    function addContact() {
        let newContact = {
            name: inputName.val(),
            phone : inputPhone.val()
        };

        let req = {
            url:url+'.json',
            method:'POST',
            data:JSON.stringify(newContact),
            success:loadContacts
        };
        $.ajax(req);
        inputName.val('');
        inputPhone.val('');
    }

    function loadContacts() {
        let req = {
            url: url+'.json',
            method: "GET",
            success:displayResults
        };

        $.ajax(req);
    }

    function displayResults(contacts){
        let phoneBook = $('#phonebook');
        phoneBook.empty();
        for (let contact in contacts) {
            let list = $("<li>");
             list.append(`${contacts[contact].name}: ${contacts[contact].phone}`);
            phoneBook.append(list);
        }
    }
});
