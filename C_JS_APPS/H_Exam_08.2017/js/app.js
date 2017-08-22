$(() => {
    Sammy('#container', function () {
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
        this.get('index.html', homeController.displayHome);
        this.get('#/home', homeController.displayHome);

        //Login action
        this.get('#/login', homeController.displayHome);
        this.post('#/login', accountController.login);

        //Logout
        this.get('#/logout', accountController.logout);

        //Register action
        this.get('#/register', homeController.displayHome);
        this.post('#/register', accountController.register);

        //Show catalog
        this.get('#/catalog', homeController.displayHome);

        //Create post
        this.get('#/submit', postController.showCreatePost);
        this.post('#/submit', postController.createPost);

        //Edit/Delete post
        this.get('#/edit/:id', postController.showEditPost);
        this.post('#/edit/:id', postController.editPost);
        this.get('#/deletePost/:id', postController.deletePost);

        //Show user posts
        this.get('#/myPosts', postController.showPostByUser);

        //Show details view with comments
        this.get('#/comments/:id', postController.showPostDetails);

        //Post comment
        this.post('#/comment/:id', postController.postComment);

        //Delete comment
        this.get('#/deleteComment/:ids',postController.deleteComment);

    }).run()
});
