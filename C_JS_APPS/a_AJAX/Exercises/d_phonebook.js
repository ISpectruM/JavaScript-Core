function attachEvents() {
    let url = 'https://phonebook-nakov.firebaseio.com/phonebook';
    // let phoneBook = $('#phonebook');
    $('#btnLoad').click(loadContacts);
    $('#btnCreate').click(addContact);

    function addContact() {
        let nameInput = $('#person');
        let phoneInput = $('#phone');

        let newContact = {
            "person": nameInput.val(),
            "phone": phoneInput.val()
        };

        nameInput.val('');
        phoneInput.val('');

        let req = {
            url: url + '.json',
            method: "POST",
            data: JSON.stringify(newContact),
            success: loadContacts,
            error:displayError
        };

        $.ajax(req);
    }

    function displayError() {

    }

    function loadContacts() {
        let req = {
            url: url + '.json',
            method:"GET",
            success: displayContacts,
            error: displayError
        };
        $.ajax(req);
    }

    function deleteContact(contact) {
        let req = {
            url:url + `/${contact}.json`,
            method:'DELETE'
        };

        $.ajax(req).then(loadContacts);
    }

    function displayContacts(contacts) {
        $('#phonebook').empty();
        for (let contact in contacts) {
            let list = $('<li>');
            let deleteBtn = $('<button>')
                .text('[Delete]')
                .click(()=>deleteContact(contact));
            list.text(`${(contacts[contact]).person}: ${(contacts[contact]).phone} `)
                .append(deleteBtn);

            $('#phonebook').append(list);
        }
    }
}
