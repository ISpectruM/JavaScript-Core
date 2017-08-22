let accountController = (()=>{

    function login(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        if (helper.isInputValid(username, password)) {
            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    helper.showInfo('Login successful.');
                    homeController.displayHome(ctx);
                }).catch(function (errContext) {
                helper.handleError(errContext);
                homeController.displayHome(ctx);
            })
        } else {
            homeController.displayHome(ctx);
        }
    }

    function logout(ctx) {
        auth.logout()
            .then(function () {
                sessionStorage.clear();
                helper.showInfo('Logout successful.');
                ctx.redirect('#');
            }).catch(auth.handleError)
    }

    function register(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        let repeatPass = ctx.params.repeatPass;

        if (password !== repeatPass) {
            auth.showError("Passwords don`t match");
            homeController.displayHome(ctx);
        } else {
            if (helper.isInputValid(username, password)) {
                auth.register(username, password)
                    .then(function (userInfo) {
                        auth.saveSession(userInfo);
                        homeController.displayHome(ctx);
                        helper.showInfo('User registration successful.');
                    }).catch(function (errContext) {
                    helper.handleError(errContext);
                    homeController.displayHome(ctx);
                });
            } else {
                homeController.displayHome(ctx);
            }
        }
    }

return {
    login,
    logout,
    register
}

})()
