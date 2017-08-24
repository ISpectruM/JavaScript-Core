handlers.home = function (ctx) {

    let partials = helper.getCommonPartials();

    if(auth.isLogged()){
        partials.page = './templates/home/userHome.hbs';
        ctx.username = sessionStorage.getItem('username');
        ctx._id = sessionStorage.getItem('userId');
    }else {
        partials.page = './templates/home/home.hbs'
    }
    ctx.loadPartials(partials)
        .then(function () {
        this.partial('./templates/main.hbs')
    });
};
