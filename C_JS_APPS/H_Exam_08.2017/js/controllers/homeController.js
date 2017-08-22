let homeController = (()=>{
    function displayHome(ctx) {
        if (sessionStorage.getItem('username')){
            ctx = helper.checkLoggedStatus(ctx);

            let endpoint = 'posts?query={}&sort={"_kmd.ect": -1}';

            //Get catalog
            requester.get('appdata', endpoint, 'kinvey')
                .then(posts => {
                    //Format time and add properties needed for partials
                    for (let i = 0; i < posts.length; i++) {
                        let currPost = posts[i];
                        currPost.rank = i+1;
                        currPost.time = helper.calcTime(currPost._kmd.ect);
                        currPost.isAuthor = currPost.author === sessionStorage.getItem('username');
                    }
                    ctx.posts = posts;
                    //Check if user is logged
                    ctx = helper.checkLoggedStatus(ctx);

                    ctx.loadPartials({
                        footer: './templates/common/footer.hbs',
                        header: './templates/common/header.hbs',
                        menu: './templates/common/menu.hbs',
                        page: './templates/posts/catalog.hbs',
                        post : './templates/posts/post.hbs',
                        loggedHome:'./templates/home/loggedHome.hbs'
                    })
                        .then(function () {
                            this.partial('./templates/page.hbs')
                        })
                }).catch(helper.handleError);
        }else {
            ctx = helper.checkLoggedStatus(ctx);
            ctx.loadPartials({
                footer: './templates/common/footer.hbs',
                header: './templates/common/header.hbs',
                page: './templates/auth/login.hbs',
                home: './templates/home/home.hbs'
            })
                .then(function () {
                    this.partial('./templates/page.hbs')
                })
        }
    }

    return {
        displayHome
    }
})();
