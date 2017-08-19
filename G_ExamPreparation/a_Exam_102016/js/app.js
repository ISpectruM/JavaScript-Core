$(() => {
    Sammy('#app', function () {
        $(document).on({
            ajaxStart: function () {
                $('#loadingBox').show();
            },
            ajaxStop: function () {
                $('#loadingBox').hide();
            }
        });

        //Load Handlebars framework
        this.use('Handlebars', 'hbs');

        //Home screen routes
        this.get('messages.html', displayHome);
        this.get('#/home', displayHome);

        //Login/Logout
        this.get('#/login', function (ctx) {
            ctx = checkLogStatus(ctx);
            ctx.loadPartials(getPartials())
                .then(function () {
                    this.partial('./templates/auth/login.hbs');
                }).catch(auth.showError)
        });
        this.post('#/login', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Login successful.');
                    displayHome(ctx);
                }).catch(auth.showError)
        });
        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Logout successful.');
                    displayHome(ctx);
                }).catch(auth.showError)
        });

        //Register
        this.get('#/register', function (ctx) {
            ctx = checkLogStatus(ctx);
            ctx.loadPartials(getPartials())
                .then(function () {
                    this.partial('./templates/auth/register.hbs');
                }).catch(auth.showError);
        });
        this.post('#/register', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let name = ctx.params.name;
            auth.register(username, password, name)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('User registration successful.');
                    displayHome(ctx);
                }).catch(auth.showError)
        });

        //Show user messages
        this.get('#/messages', function (ctx) {
            let username = sessionStorage.getItem('username');
            let endpoint = `messages?query={"recipient_username":"${username}"}`;

            requester.get('appdata', endpoint, 'kinvey')
                .then(data => {
                    //Format the date and user
                    data.map(obj => {
                        obj.date = formatDate(obj._kmd.lmt);
                        obj.sender = formatSender(
                            obj.sender_name, obj.sender_username);
                        obj.message = obj.text;
                    });
                    ctx.messages = data;
                    console.log(ctx);
                    //Check if user is logged
                    ctx = checkLogStatus(ctx);

                    //Add message partial to other partials
                    let partials = getPartials();
                    partials.message = './templates/messages/message.hbs';

                    ctx.loadPartials(partials)
                        .then(function () {
                            this.partial('./templates/messages/messagesPage.hbs');
                        })
                }).catch(auth.showError);
        });

        //Send message
        this.get('#/send', function (ctx) {
            ctx = checkLogStatus(ctx);

            requester.get('user', '', 'kinvey')
                .then(data => {
                    data.map(obj => {
                        obj.name = formatSender(obj.name, obj.username);
                    });
                    ctx.users = data;

                    //Add receiver-user partial to other partials
                    let partials = getPartials();
                    partials.user = './templates/messages/receiverPartial.hbs';

                    ctx.loadPartials(partials)
                        .then(function () {
                            this.partial('./templates/messages/sendMessage.hbs')
                        })
                }).catch(auth.showError);
        });
        this.post('#/send', function (ctx) {
            let sender_username = sessionStorage.getItem('username');
            let sender_name = sessionStorage.getItem('name');
            let recipient_username = $('option:selected').attr('value');
            let text = ctx.params.text;

            let data = {
                sender_username,
                sender_name,
                recipient_username,
                text
            };
            requester.post('appdata', 'messages', 'kinvey', data)
                .then(function () {
                    auth.showInfo('Message sent.');
                    ctx.redirect('#/archive')
                }).catch(auth.showError);
        });

        //View archive
        this.get('#/archive', function (ctx) {
            let username = sessionStorage.getItem('username');
            let endPart = `messages?query={"sender_username":"${username}"}`;

            requester.get('appdata', endPart, 'kinvey')
                .then(messages => {
                    messages.map(obj => {
                        obj.date = formatDate(obj._kmd.lmt);
                    });

                    ctx.archive = messages;
                    ctx = checkLogStatus(ctx);

                    let partials = getPartials();
                    partials.message = './templates/messages/archiveMessagePartial.hbs';
                    ctx.loadPartials(partials)
                        .then(function () {
                            this.partial('./templates/messages/archiveView.hbs')
                                .then(function () {
                                    $('button').click((e) => {
                                        let id = $(e.target).attr('data-id');
                                        requester.remove('appdata',`messages/${id}`,'kinvey')
                                            .then(function () {
                                                auth.showInfo('Message deleted.');
                                                $(e.target).parent().parent().remove()
                                            }).catch(auth.showError);
                                    })
                                })
                        })
                }).catch(auth.showError);
        });

        ////Helper functions
        //Get common partials
        function getPartials() {
            return {
                infoElements: './templates/common/infoElements.hbs',
                loggedLinks: './templates/common/menuLinks/loggedLinks.hbs',
                notLoggedLinks: './templates/common/menuLinks/notLoggedLinks.hbs',
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }
        }

        //Helper view home screen function
        function displayHome(ctx) {
            ctx = checkLogStatus(ctx);
            ctx.loadPartials(getPartials())
                .then(function () {
                    this.partial('./templates/home/home.hbs')
                })
        }

        //Helper function to check for logged in user
        function checkLogStatus(ctx) {
            let isLogged = sessionStorage.getItem('username') !== null;
            ctx.isLogged = isLogged;
            if (isLogged) {
                ctx.username = sessionStorage.getItem('username');
            }
            return ctx;
        }

        //Format date
        function formatDate(dateISO8601) {
            let date = new Date(dateISO8601);
            if (Number.isNaN(date.getDate()))
                return '';
            return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
                "." + date.getFullYear() + ' ' + date.getHours() + ':' +
                padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

            function padZeros(num) {
                return ('0' + num).slice(-2);
            }
        }

        //Format sender name
        function formatSender(name, username) {
            if (!name)
                return username;
            else
                return username + ' (' + name + ')';
        }

    }).run()
});
