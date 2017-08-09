function startApp(){
    const baseUrl = 'https://baas.kinvey.com/';
    const appId = 'kid_HkfpTpZwZ';
    const appSecret = 'e7d2ea86b84c4789985889a373df2049';
    const headersBasicAuth = {
        'Authorization': 'Basic '+ btoa(appId+':'+appSecret),
        'Content-Type':'application/json'
    };
    let userAuth ='';

    showHideMenuLinks();
    showView('viewHome');

    //Show loading info on start/end of loading the page
    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show();
        },
        ajaxStop: function () {
            $('#loadingBox').hide();
        }
    });

    //Bind the link actions
    $("#linkHome").click(showHomeView);
    $("#linkLogin").click(showLoginView);
    $("#linkRegister").click(showRegisterView);
    $("#linkListBooks").click(listBooks);
    $("#linkCreateBook").click(showCreateBookView);
    $("#linkLogout").click(logoutUser);

    $('#formLogin').submit(loginUser);
    $("#formRegister").submit(registerUser);
    $("#formCreateBook").submit(createBook);
    $("#formEditBook").submit(editBook);
    $('form').submit(function (e) {
        e.preventDefault();
    });

    $('#infoBox, #errorBox').on('click', function () {
        $(this).fadeOut();
    });

    //Show infoboxes/links
    function showView(view) {
        $('main > section').hide();
        $(`#${view}`).show();
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(function() {
            errorBox.fadeOut();
        }, 3000);
    }

    function showInfo(message) {
        let infoBox=$('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(function() {
            infoBox.fadeOut();
        }, 3000);
    }

    function showHideMenuLinks() {
        $('#linkHome').show();
        if (sessionStorage.getItem('userAuth')){
            $("#linkLogin").hide();
            $("#linkRegister").hide();
            $("#linkListBooks").show();
            $("#linkCreateBook").show();
            $("#linkLogout").show();
        } else {
            $("#linkLogin").show();
            $("#linkRegister").show();
            $("#linkListBooks").hide();
            $("#linkCreateBook").hide();
            $("#linkLogout").hide();
        }
    }

    //Show views
    function showHomeView() {
        showView('viewHome')
    }

    function showLoginView() {
        $('#formLogin').trigger('reset');
        showView('viewLogin');
    }

    function showRegisterView() {
        $('#formRegister').trigger('reset');
        showView('viewRegister');
    }

    function listBooks() {
        $('#books').empty();
        showView('viewBooks');

        $.ajax({
            url: baseUrl + 'appdata/' + appId + '/book-library',
            headers: getKinveyUserAuthHeaders(),
            success: loadBooksSuccess,
            error: handleError
        });

        function loadBooksSuccess(books) {
            showInfo('Books loaded.');
            if (books.length === 0 ){
                $('#books').text('No books in the library');
            } else {
                let booksTable = $('<table>')
                    .append($('<tr>').append(
                        '<th>Title</th><th>Author</th>',
                        '<th>Description</th><th>Actions</th>'));
                for (let book of books){
                    appendBookRow(book, booksTable);
                }
                $('#books').append(booksTable);
            }

            function appendBookRow(book, booksTable) {
                let links = [];
                if (book._acl.creator == sessionStorage.getItem('userId')) {
                    let deleteLink = $('<a href="#">[Delete]</a>')
                        .click(deleteBook.bind(this, book));
                    let editLink = $('<a href="#">[Edit]</a>')
                        .click(loadBookForEdit.bind(this, book));
                    links = [deleteLink, ' ', editLink];
                }

                booksTable.append($('<tr>').append(
                    $('<td>').text(book.title),
                    $('<td>').text(book.author),
                    $('<td>').text(book.description),
                    $('<td>').append(links)
                ));

                function loadBookForEdit(book) {
                    $.ajax({
                        method: "GET",
                        url: baseUrl + "appdata/" + appId + "/book-library/" + book._id,
                        headers: getKinveyUserAuthHeaders(),
                        success: loadBookForEditSuccess,
                        error: handleError
                    });

                    function loadBookForEditSuccess() {
                        let formEdit = $('#formEditBook');
                        $(formEdit).find('input[name=id]').val(book._id);
                        $(formEdit).find('input[name=title]').val(book.title);
                        $(formEdit).find('input[name=author]').val(book.author);
                        $(formEdit).find('textarea[name=descr]').val(book.description);
                        showView('viewEditBook');
                    }
                }
            }
        }
    }

    function editBook() {
        let formEdit = $('#formEditBook');
        let bookId = $(formEdit).find('input[name=id]').val();
        let data = {
            title: $(formEdit).find('input[name=title]').val(),
            author: $(formEdit).find('input[name=author]').val(),
            description: $(formEdit).find('textarea[name=descr]').val(),
        };
        $.ajax({
            url:baseUrl + 'appdata/' + appId + '/book-library/' + bookId,
            method:"PUT",
            data: data,
            headers: getKinveyUserAuthHeaders(),
            success: editSuccess,
            error:handleError
        });
        function editSuccess(data) {
            listBooks();
            showInfo('Book successfully edited.');
        }
    }

    function showCreateBookView() {
        $('#formCreateBook').trigger('reset');
        showView('viewCreateBook');
    }

    function createBook() {
        let formCreate = $('#formCreateBook');
        let bookData = {
            title: $(formCreate).find('input[name=title]').val(),
            author: $(formCreate).find('input[name=author]').val(),
            description: $(formCreate).find('textarea[name=descr]').val()
        };
        $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appId + "/book-library",
            headers: getKinveyUserAuthHeaders(),
            data: bookData,
            success: createBookSuccess,
            error: handleError
        });

        function createBookSuccess() {
            listBooks();
            showInfo('Book successfully created.')
        }
    }

    function deleteBook(book) {
        $.ajax({
            method: "DELETE",
            url: baseUrl+ "appdata/" +
                appId + "/book-library/" + book._id,
            headers: getKinveyUserAuthHeaders(),
            success: deleteBookSuccess,
            error: handleError
        });
        function deleteBookSuccess(data) {
            listBooks();
            showInfo('Book successfully deleted.');
        }
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " +
            sessionStorage.getItem('userAuth'),
        };
    }

    //User session
    function registerUser() {
        let data = {
            "username":$('#formRegister').find("input[name='username']").val(),
            "password":$('#formRegister').find("input[name='passwd']").val()
        };
        console.log(baseUrl + 'user/' + appId);
        $.ajax({
            url: baseUrl + 'user/' + appId + '/',
            method:"POST",
            headers: headersBasicAuth,
            data: JSON.stringify(data),
            success:handleRegisterSuccess,
            error:handleError
        })
    }

    function loginUser() {
        let loginForm = $('#formLogin');
        let userInput = $(loginForm).find("input[name='username']").val();
        let passInput = $(loginForm).find("input[name='passwd']").val();
        $.ajax({
            url: baseUrl + 'user/' + appId + '/login',
            method:"POST",
            headers: headersBasicAuth,
            data:JSON.stringify({
                "username":userInput,
                "password":passInput
            }),
            success:loginSuccess,
            error:handleError
        });

        function loginSuccess(data) {
            saveAuthInSession(data);
            showHideMenuLinks();
            listBooks();
            showInfo('Login successful.');
        }
    }

    function logoutUser() {
        $.ajax({
            url: baseUrl + 'user/' + appId + '/_logout',
            method:"POST",
            headers: {'Authorization':'Kinvey ' + userAuth},
            success: successLogout,
            error: handleError
        });
        function successLogout(data) {
            sessionStorage.clear();
            showHideMenuLinks();
            showView('viewHome');
            showInfo('Logout successful.');
            $('#loggedInUser').text("");
        }

    }

    function handleRegisterSuccess(userInfo) {
        saveAuthInSession(userInfo);
        showHideMenuLinks();
        listBooks();
        showInfo('User registration successful.');
    }

    function saveAuthInSession(userInfo) {
        userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('userAuth',userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId',userId);
        let username = userInfo.username;
        $('#loggedInUser').text('Welcome ' + username + '!');
    }

    function handleError(err) {
        let errorMsg = JSON.stringify(err);
        if (err.readyState === 0){
            errorMsg = 'Cannot connect due to network error.';
        }
        if (err.responseJSON && err.responseJSON.description){
            errorMsg = err.responseJSON.description
        }

        showError(errorMsg);
    }
}
