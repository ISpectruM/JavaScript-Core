handlers.login = function (ctx) {
    let partials = helper.getCommonPartials();
    partials.page = './templates/auth/loginPage.hbs';
    ctx.loadPartials(partials)
        .then(function () {
            this.partial('./templates/main.hbs');
        })
};

handlers.loginAction = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    auth.login(username, password)
        .then(function (userInfo) {
            auth.saveSession(userInfo);
            helper.showInfo('Login successful.');
            ctx.redirect('#');
        }).catch((context)=> {
        ctx.redirect('#/login');
        helper.handleError(context);
    } )
};

handlers.register = function () {

    let partials = helper.getCommonPartials();
    partials.page = './templates/auth/registerPage.hbs';
    this.loadPartials(partials)
        .then(function () {
            this.partial('./templates/main.hbs');
        })
};

handlers.registerAction = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    let name = ctx.params.name;
    auth.register(username, password, name)
        .then(function (userInfo) {
            auth.saveSession(userInfo);
            helper.showInfo('User registration successful.');
            ctx.redirect('#');
        }).catch(helper.handleError)
};

handlers.logout = function (ctx) {
    auth.logout().then(function () {
        sessionStorage.clear();
        helper.showInfo('Logout successful.');
        ctx.redirect('#')
    }).catch(helper.handleError);
};