function startApp() {
    loadTemplates();

    const baseUrl = 'https://baas.kinvey.com/';
    const appId = 'kid_HkfpTpZwZ';
    const appSecret = 'e7d2ea86b84c4789985889a373df2049';
    const basicAuth = {
        'Authorization': 'Basic ' + btoa(appId + ':' + appSecret),
        'Content-Type': 'application/json'
    };

    const templates={};
    const linksContext = [
        {id: "linkHome", text: "Home"},
        {id: "linkLogin", text: "Login"},
        {id: "linkRegister", text: "Register"},
        {id: "linkListAds", text: "List Advertisements"},
        {id: "linkCreateAds", text: "Create Advertisement"},
        {id: "linkLogout", text: "Logout"}
    ];
    const loginRegisterContext = {
        login:[{
            sectionId:"viewLogin",
            header:"Please login",
            formId:"formLogin",
            buttonId:"buttonLoginUser",
            btnText:"Login", class:"viewLogin"}
        ],
        register:[{
            sectionId:"viewRegister",
            header:"Please register here",
            formId:"formRegister",
            buttonId:"buttonRegisterUser",
            btnText:"Register",
            class:"viewRegister"}]
    };
    const createEditAdContext = {
        create:[{
            sectionId:"viewCreateAd",
            class:"viewCreateAd",
            header:"Create new Advertisement",
            formId:"formCreateAd",
            btnId:"buttonCreateAd",
            btnText:"Create",
        }],
        edit:[{
            sectionId:"viewEditAd",
            class:"viewEditAd",
            header:"Edit existing advertisement",
            formId:"formEditAd",
            btnId:"buttonEditAd",
            btnText:"Edit"
        }]
    };

    //Template containers
    let menuContainer = document.getElementById('menu-links');
    let mainContainer = $("#content");

    async function loadTemplates() {
        const [homeLinks,loginRegister,createEditAd,listAds,listPartial,homePage] = await Promise.all([
            $.get('./templates/menuTemplate.html'),
            $.get('./templates/loginRegisterTemplate.html'),
            $.get('./templates/createAd.html'),
            $.get('./templates/listAds.html'),
            $.get('./templates/adPartial.html'),
            $.get('./templates/homePage.html')
            ]);
        templates.homeLinksTemplate = Handlebars.compile(homeLinks);
        templates.loginRegiser = Handlebars.compile(loginRegister);
        templates.createAd = Handlebars.compile(createEditAd);
        Handlebars.registerHelper('json',function (context) {
            return JSON.stringify(context);
        });
        Handlebars.registerPartial('ads',listPartial);
        templates.listAds = Handlebars.compile(listAds);
        templates.homePage = homePage;

        renderMenu();
        renderHomePage();
    }

    //Show loading box on action start and hide it at the end;
    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show();
        },
        ajaxStop: function () {
            $('#loadingBox').hide();
        }
    });

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
        setTimeout(() => {
            element.fadeIn();
        }, 1000);
        setTimeout(() => {
            element.fadeOut();
        }, 2000);
    }

    //Show view sections
    function renderMenu() {
        $(menuContainer).empty();
        for (let link of linksContext) {
            if (sessionStorage.getItem('userId') === null) {
                if(link.id === 'linkHome' ||
                    link.id === "linkLogin" ||
                    link.id === 'linkRegister'){
                    menuContainer.innerHTML +=templates.homeLinksTemplate(link);
                }
            } else {
                if(link.id === 'linkHome' ||
                    link.id !== "linkLogin" &&
                    link.id !== 'linkRegister'){
                    menuContainer.innerHTML +=templates.homeLinksTemplate(link);
                }
            }
        }

        attachMenuLinks();
    }
    
    function attachMenuLinks() {
        $("#linkHome").click(renderHomePage);
        $("#linkLogin").click(renderLoginView);
        $("#linkRegister").click(renderRegisterView);
        $("#linkListAds").click(renderAds);
        $("#linkCreateAds").click(renderCreateAddView);
        $("#linkLogout").click(logOutUser);
    }

    function renderHomePage() {
        mainContainer.empty();
        mainContainer.html(templates.homePage);
    }

    function renderLoginView() {
        mainContainer.empty();
            mainContainer.html($(templates.loginRegiser(loginRegisterContext.login[0]))
                .css('display','block'));
        $('#buttonLoginUser').click(loginUser);
    }

    function renderRegisterView() {
        mainContainer.empty();
        mainContainer.html($(templates.loginRegiser(loginRegisterContext.register[0]))
            .css('display','block'));
        $('#buttonRegisterUser').click(registerUser);
    }

    function renderAds() {
        $.ajax({
            url: baseUrl + 'appdata/' + appId + '/Prodavachnik',
            method: "GET",
            headers: getKinveyAuth(),
            success: showAdList,
            error: handleError
        });

        function showAdList(data) {
            if (data.length === 0) {
                $('#books').text('No advertisements available.');
            } else {
                let authorAds = data.map(ad => {
                    if (ad._acl.creator === sessionStorage.getItem('userId')){
                        ad.isAuthor = true;
                        return ad;
                    } else {
                        ad.isAuthor = false;
                        return ad
                    }
                });
                let adsContext = {authorAds};
                console.log(adsContext);
                mainContainer.empty();
                mainContainer.html(templates.listAds(adsContext));

                $('.delete').click((event)=> {
                    let ad = JSON.parse($(event.target).attr('data-id'));
                    deleteAd(ad)
                });
                $('.edit').click((event)=> {
                    let ad = JSON.parse($(event.target).attr('data-id'));
                    renderEditAdView(ad)
                });
                showInfo('Adds loaded.')
            }
        }
    }
    
    function renderEditAdView(ad) {
        mainContainer.empty();
        mainContainer.html($(templates.createAd(createEditAdContext.edit[0]))
            .css('display','block'));

        let editForm = $('#formEditAd');
        editForm.append($('<input name="id">')
            .css('display','none').val(ad._id));
        editForm.append($('<input name="publisher">')
            .css('display','none').val(ad.publisher));
        editForm.find('input[name=title]').val(ad.title);
        editForm.find('textarea[name=description]').val(ad.description);
        editForm.find('input[name=datePublished]').val(ad.date);
        editForm.find('input[name=price]').val(ad.price);

        $('#buttonEditAd').click(editAd);

        showInfo('Ad loaded for edit');
    }

    function renderCreateAddView() {
        mainContainer.empty();
        mainContainer.html($(templates.createAd(createEditAdContext.create[0]))
            .css('display','block'));
        $('#buttonCreateAd').click(createAd);
    }

    //CRUD on adds
    function createAd() {
        let createForm = $('#formCreateAd');
        let title = $(createForm).find('input[name=title]').val();
        let description = $(createForm).find('textarea[name=description]').val();
        let date = $(createForm).find('input[name=datePublished]').val();
        let price = $(createForm).find('input[name=price]').val();
        let user = sessionStorage.getItem('username');

        let data = {
            title: title,
            publisher: user,
            description: description,
            date: date,
            price: price
        };

        $.ajax({
            url: baseUrl + 'appdata/' + appId + '/Prodavachnik',
            method: "POST",
            headers: getKinveyAuth(),
            data: JSON.stringify(data),
            success: handleCreateSuccess,
            error: handleError
        });

        function handleCreateSuccess(adds) {
            renderAds();
            showInfo('Ad successfully created.');
        }
    }

    function deleteAd(ad) {
        $.ajax({
            url: baseUrl + 'appdata/' + appId + '/Prodavachnik/' + ad._id,
            method: "DELETE",
            headers: getKinveyAuth(),
            success: handleDeleteSuccess,
            error: handleError
        });

        function handleDeleteSuccess(data) {
            showInfo('Ad successfully deleted.');
            setTimeout(renderAds(), 2000);
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
            publisher: publisher,
            title: title,
            description: description,
            date: date,
            price: price
        };

        $.ajax({
            url: baseUrl + 'appdata/' + appId + '/Prodavachnik/' + id,
            method: "PUT",
            headers: getKinveyAuth(),
            data: JSON.stringify(data),
            success: handleEditSuccess,
            error: handleError
        });

        function handleEditSuccess(data) {
            showInfo('Edit successful.');
            setTimeout(renderAds(), 2000);
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
            url: baseUrl + 'user/' + appId + '/login',
            method: "POST",
            headers: basicAuth,
            data: JSON.stringify(data),
            success: handleLoginSuccess,
            error: handleError
        });

        function handleLoginSuccess(user) {
            mainContainer.empty();
            saveSession(user);
            showInfo('Login successful!');
            renderMenu();
            renderHomePage();
        }
    }

    function logOutUser() {
        $.ajax({
            url: baseUrl + 'user/' + appId + '/_logout',
            method: "POST",
            headers: getKinveyAuth(),
            success: successLogout,
            error: handleError
        });

        function successLogout(data) {
            sessionStorage.clear();
            showInfo('Logout successful.');
            $('#loggedInUser').text("");
            renderMenu();
            renderHomePage();
        }
    }

    function registerUser() {
        let registerSection = $('#viewRegister');
        let userName = $(registerSection).find('input[name=username]').val();
        let userPassword = $(registerSection).find('input[name=passwd]').val();
        let userData = {
            "username": userName,
            "password": userPassword
        };

        $.ajax({
            url: baseUrl + 'user/' + appId,
            method: "POST",
            headers: basicAuth,
            data: JSON.stringify(userData),
            success: handleRegisterSuccess,
            error: handleError
        });

        function handleRegisterSuccess(user) {
            saveSession(user);
            mainContainer.empty();
            showInfo('User successfully registered!');
            renderMenu();
            renderHomePage();
        }
    }

    function saveSession(user) {
        sessionStorage.clear();
        sessionStorage.setItem('userAuthToken', user._kmd.authtoken);
        sessionStorage.setItem('userId', user._id);
        sessionStorage.setItem('username', user.username);
        $('#loggedInUser').text('Welcome ' + user.username);
    }

    function getKinveyAuth() {
        return {
            "Authorization": "Kinvey " + sessionStorage.getItem('userAuthToken'),
            "Content-Type": "application/json"
        }
    }

    //Handle error
    function handleError(err) {
        let errorMsg = JSON.stringify(err);
        if (err.readyState === 0) {
            errorMsg = 'Cannot connect due to network error.';
        }
        if (err.responseJSON && err.responseJSON.description) {
            errorMsg = err.responseJSON.description
        }

        showError(errorMsg);
    }
}