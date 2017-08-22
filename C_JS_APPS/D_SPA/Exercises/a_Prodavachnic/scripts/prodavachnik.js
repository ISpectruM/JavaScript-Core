function startApp() {
    //Get menu links
    let homeLink = $("#linkHome");
    let loginLink = $("#linkLogin");
    let registerLink = $("#linkRegister");
    let listAddsLink = $("#linkListAds");
    let createAddsLink = $("#linkCreateAd");
    let logOutLink = $("#linkLogout");

    //Get views
    let homeSection = $('#viewHome');
    let loginSection = $('#viewLogin');
    let registerSection = $('#viewRegister');
    let listAddsSection = $('#viewAds');
    let createAddSection = $('#viewCreateAd');
    let editAddSection = $('#viewEditAd');

    const baseUrl = 'https://baas.kinvey.com/';
    const appId = 'kid_HkfpTpZwZ';
    const appSecret = 'e7d2ea86b84c4789985889a373df2049';
    const basicAuth = {
        'Authorization': 'Basic ' + btoa(appId + ':' + appSecret),
        'Content-Type':'application/json'
    };

    //Show loading box on action start and hide it at the end;
    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show();
        },
        ajaxStop: function () {
            $('#loadingBox').hide();
        }
    });

    //Bind the button actions
    $('#buttonLoginUser').click(loginUser);
    $('#buttonRegisterUser').click(registerUser);
    $('#buttonCreateAd').click(createAd);
    $('#buttonEditAd').click(editAd);

    //Show index page and menu links at the beginning
    showView(homeSection);
    showHideMenuLinks();

    //Assign events on menu links
    homeLink.click(showHomeView);
    loginLink.click(showLoginView);
    registerLink.click(showRegisterView);
    listAddsLink.click(listAdds);
    createAddsLink.click(showCreateAddView);
    logOutLink.click(logOutUser);

    //Show info/error boxes and menu links functions
    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        fadeInOut(infoBox);
    }

    function showError(errorMsg) {
        let errorBox = $('#errorBox');
        errorBox.text(errorMsg);
        errorBox.show();
        fadeInOut(errorBox);
    }

    function fadeInOut(element) {
        setTimeout(()=> {
            element.fadeIn();
        },1000);
        setTimeout(()=> {
            element.fadeOut();
        },2000);
    }

    function showHideMenuLinks() {
        $('#menu').find('.menu-item').hide();
        homeLink.show()
        if (sessionStorage.getItem('userId') === null) {
            loginLink.show();
            registerLink.show();
            listAddsLink.hide();
            createAddsLink.hide();
            logOutLink.hide();
            $('#loggedInUser').hide();

        } else {
            loginLink.hide();
            registerLink.hide();
            listAddsLink.show();
            createAddsLink.show();
            logOutLink.show();
            $('#loggedInUser').show();
        }
    }

    //Show view sections
    function showView(section) {
        $('main > section').hide();
        section.show();
    }

    function showHomeView() {
        showView(homeSection);
    }

    function showLoginView() {
        $(loginSection).trigger('reset');
        showView(loginSection);
    }

    function showRegisterView() {
        registerSection.trigger('reset');
        showView(registerSection);
    }

    function listAdds() {

        $.ajax({
            url: baseUrl + 'appdata/' + appId + '/Prodavachnik',
            method:"GET",
            headers: getKinveyAuth(),
            success: showAdList,
            error: handleError
        });

        function showAdList(data) {
            let addsSection = $('#ads');
            addsSection.empty();

            if (data.length === 0 ) {
                $('#books').text('No advertisements available.');
            } else {
                let table = $('<table>');
                $('<tr>')
                    .append($('<th>Title</th>'))
                    .append($('<th>Publisher</th>'))
                    .append($('<th>Description</th>'))
                    .append($('<th>Price</th>'))
                    .append($('<th>Date Published</th>'))
                    .append($('<th>Actions</th>'))
                    .appendTo(table);

                for (let ad of data) {
                    let tableRow = fillTableRow(ad);
                    tableRow.appendTo(table);
                }

                addsSection.append(table);
                $('main > section').hide();
                addsSection.hide();
                listAddsSection.show();
                setTimeout(()=>{addsSection.fadeIn();},500);
                showInfo('Adds loaded.')
            }
        }

        function fillTableRow(ad) {
                let links = [];
                if(ad._acl.creator === sessionStorage.getItem('userId')){

                    let deleteLink  = ($('<a href="#">[Delete]</a>')
                        .click(deleteAd.bind(this,ad)));
                    let editLink = ($('<a href="#">[Edit]</a>')
                        .click(loadForEdit.bind(this,ad)));
                    links = [deleteLink,' ',editLink];
                }

            return $('<tr>')
                .append($('<td>').text(ad.title))
                .append($('<td>').text(ad.publisher))
                .append($('<td>').text(ad.description))
                .append($('<td>').text(ad.price))
                .append($('<td>').text(ad.date))
                .append($('<td>').append(links));
        }

        function loadForEdit(ad) {
            let editForm = $('#formEditAd');
            editForm.find('input[name=id]').val(ad._id);
            editForm.find('input[name=publisher]').val(ad.publisher);
            editForm.find('input[name=title]').val(ad.title);
            editForm.find('textarea[name=description]').val(ad.description);
            editForm.find('input[name=datePublished]').val(ad.date);
            editForm.find('input[name=price]').val(ad.price);

            showView(editAddSection);
            showInfo('Ad loaded for edit');
        }
    }

    function showCreateAddView() {
        $(createAddSection).trigger('reset');
        showView(createAddSection);
    }

    //CRUD on adds
    function createAd() {
        let createForm = $('#formCreateAd');
        let title = $(createForm).find('input[name=title]').val();
        let description = $(createForm).find('textarea[name=description]').val();
        let date = $(createForm).find('input[name=datePublished]').val();
        let price = $(createForm).find('input[name=price]').val();
        let user = sessionStorage.getItem('username')

        let data ={
            title: title,
            publisher: user,
            description:description,
            date:date,
            price:price
        };

        $.ajax({
            url: baseUrl + 'appdata/' + appId + '/Prodavachnik',
            method:"POST",
            headers: getKinveyAuth(),
            data:JSON.stringify(data),
            success:handleCreateSuccess,
            error: handleError
        });

        function handleCreateSuccess(adds) {
            listAdds();
            showInfo('Ad successfully created.');
        }
    }

    function deleteAd(ad) {
        $.ajax({
            url: baseUrl + 'appdata/' + appId + '/Prodavachnik/' + ad._id,
            method:"DELETE",
            headers: getKinveyAuth(),
            success: handleDeleteSuccess,
            error: handleError
        });

        function handleDeleteSuccess(data) {
            showInfo('Ad successfully deleted.');
            setTimeout(listAdds(),2000);
        }

    }

    function editAd() {
        let editForm = $('#formEditAd');
        let id = editForm.find('input[name=id]').val();
        let publisher = editForm.find('input[name=publisher]').val();
        let title = editForm.find('input[name=title]').val();
        let description = editForm.find('textarea[name=description]').val();
        let date = editForm.find('input[name=datePublished]').val();
        let price = editForm.find('input[name=price]').val();

        let data = {
            publisher:publisher,
            title:title,
            description:description,
            date:date,
            price:price
        };

        $.ajax({
            url: baseUrl + 'appdata/' + appId + '/Prodavachnik/'+ id,
            method:"PUT",
            headers:getKinveyAuth(),
            data:JSON.stringify(data),
            success:handleEditSuccess,
            error:handleError
        });

        function handleEditSuccess(data) {
            showInfo('Edit successful.');
            setTimeout(listAdds(),2000);
        }
    }

    //User sessions
    function loginUser() {
        let loginForm = $('#formLogin');
        let data = {
            "username": $(loginForm).find('input[name=username]').val(),
            "password": $(loginForm).find('input[name=passwd]').val()
        };

        $.ajax({
            url:baseUrl + 'user/' + appId + '/login',
            method:"POST",
            headers: basicAuth,
            data:JSON.stringify(data),
            success:handleLoginSuccess,
            error:handleError
        });

        function handleLoginSuccess(user) {
            saveSession(user);
            showView(homeSection);
            showHideMenuLinks();
            showInfo('Login successful!')
        }
    }

    function logOutUser() {
        let userAuthToken = sessionStorage.getItem('userAuthToken');
        $.ajax({
            url: baseUrl + 'user/' + appId + '/_logout',
            method:"POST",
            headers: getKinveyAuth(),
            success: successLogout,
            error: handleError
        });
        function successLogout(data) {
            sessionStorage.clear();
            showHideMenuLinks();
            showView(homeSection);
            showInfo('Logout successful.');
            $('#loggedInUser').text("");
        }
    }

    function registerUser() {
        let userName = $(registerSection).find('input[name=username]').val();
        let userPassword = $(registerSection).find('input[name=passwd]').val();
        let userData = {
            "username":userName,
            "password":userPassword
        };

        $.ajax({
            url: baseUrl + 'user/' + appId,
            method: "POST",
            headers: basicAuth,
            data: JSON.stringify(userData),
            success: handleRegisterSuccess,
            error:handleError
        });

        function handleRegisterSuccess(user) {
            saveSession(user);
            showHideMenuLinks();
            showView(homeSection);
            showInfo('User successfully registered!');
        }
    }

    function saveSession(user) {
        sessionStorage.clear();
        sessionStorage.setItem('userAuthToken', user._kmd.authtoken);
        sessionStorage.setItem('userId',user._id);
        sessionStorage.setItem('username',user.username);
        $('#loggedInUser').text('Welcome ' + user.username);
    }

    function getKinveyAuth() {
        return {
            "Authorization":"Kinvey " + sessionStorage.getItem('userAuthToken'),
            "Content-Type":"application/json"
        }
    }

    //Handle error
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