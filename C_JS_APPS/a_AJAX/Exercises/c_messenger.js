function attachEvents() {
    let url = 'https://phonebook-9d903.firebaseio.com/messenger';
    $('#submit').click(submit);
    $('#refresh').click(refresh);
    let messages = $('#messages');

    function submit() {
        let authorInput = $('#author');
        let messageInput = $('#content');

        let message = {
            author: authorInput.val(),
            content: messageInput.val(),
            timestamp: Date.now()
        };

        authorInput.val('');
        messageInput.val('');

        let req = {
            url:url + '.json',
            method:"POST",
            data:JSON.stringify(message),
            success: showMessages
        };
        $.ajax(req);

        function showMessages() {
            let req = {
                url: url + '.json',
                method:"GET",
                success: displayMessages
            };
            $.ajax(req);
        }
    }

    function refresh() {
        let req = {
            url: url + '.json',
            method:"GET",
            success: displayMessages
        };
        $.ajax(req);
    }

    function displayMessages(data) {
        let sortedData = $.map(data,(value,index)=> value)
            .sort((a,b)=> {
            return a.timestamp - b.timestamp});
        messages.empty();
        for (let message of sortedData) {
            let prev = messages.text();
            messages.text(prev + `${message.author}: ${message.content}\n`);
        }
    }
}
