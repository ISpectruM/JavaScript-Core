const handlers = {};

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

        this.use('Handlebars','hbs');

        this.get('market.html', handlers.home);
        
        this.get('#/login', handlers.login);
        this.post('#/login', handlers.loginAction);
        this.get('#/logout', handlers.logout);

        this.get('#/register', handlers.register);
        this.post('#/register', handlers.registerAction);

        this.get('#/shop',handlers.shop);
        this.get('#/cart/:id', handlers.cart);

    }).run();
});
