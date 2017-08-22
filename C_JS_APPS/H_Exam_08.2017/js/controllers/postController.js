let postController = (()=>{

    function showCreatePost(ctx) {
        ctx = helper.checkLoggedStatus(ctx);
        ctx.loadPartials({
            footer: './templates/common/footer.hbs',
            header: './templates/common/header.hbs',
            menu: './templates/common/menu.hbs',
            page: './templates/posts/submit.hbs',
            loggedHome: './templates/home/loggedHome.hbs'
        }).then(function () {
            this.partial('./templates/page.hbs');
        })
    }

    function createPost(ctx) {
        let url = ctx.params.url;
        let title = ctx.params.title;
        let imageUrl = ctx.params.image;
        let description = ctx.params.comment;
        let author = sessionStorage.getItem('username');

        if(helper.isPostInputValid(url,title)){
            let data = {
                url,
                title,
                imageUrl,
                description,
                author
            };
            requester.post('appdata', 'posts', 'kinvey', data)
                .then(function () {
                    helper.showInfo('Post created.');
                    ctx.redirect('#/catalog');
                }).catch(helper.handleError);
        } else {
            ctx.redirect('#/submit');
        }

    }

    function showEditPost(ctx) {
        let id = ctx.params.id.substring(1);

        let endpoint = 'posts/' + id;
        requester.get('appdata', endpoint, 'kinvey')
            .then(post => {
                ctx.url = post.url;
                ctx.title = post.title;
                ctx.imageUrl = post.imageUrl;
                ctx.description = post.description;
                ctx._id = post._id;

                ctx = helper.checkLoggedStatus(ctx);
                ctx.loadPartials({
                    footer: './templates/common/footer.hbs',
                    header: './templates/common/header.hbs',
                    menu: './templates/common/menu.hbs',
                    page: './templates/posts/edit.hbs',
                    loggedHome: './templates/home/loggedHome.hbs'
                }).then(function () {
                    this.partial('./templates/page.hbs');
                })
            }).catch(helper.handleError);
    }

    function editPost(ctx) {
        let id = ctx.params.id.substring(1);
        let url = ctx.params.url;
        let title = ctx.params.title;
        let imageUrl = ctx.params.image;
        let description = ctx.params.description;
        let author = sessionStorage.getItem('username');

        if (helper.isPostInputValid(url,title)){
            let data = {
                url,
                title,
                imageUrl,
                description,
                author
            };
            requester.update('appdata', 'posts/' + id, 'kinvey', data)
                .then(function () {
                    helper.showInfo(`Post ${title} updated.`);
                    ctx.redirect('#/catalog');
                }).catch(helper.handleError);
        } else{
            ctx.redirect('#/edit/:'+id);
        }
    }

    function deletePost(ctx) {
        let id = ctx.params.id.substring(1);
        requester.remove('appdata', 'posts/' + id, 'kinvey')
            .then(function () {
                helper.showInfo('Post deleted.');
                ctx.redirect('#/catalog');
            }).catch(helper.handleError);
    }

    function showPostByUser (ctx) {
        let username = sessionStorage.getItem('username');
        let endPart = `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`;

        requester.get('appdata', endPart, 'kinvey')
            .then(posts => {
                console.log(posts);
                for (let i = 0; i < posts.length; i++) {
                    let currPost = posts[i];
                    currPost.rank = i + 1;
                    currPost.time = helper.calcTime(currPost._kmd.ect);
                    currPost.isAuthor = true;
                }
                ctx.posts = posts;
                //Check if user is logged
                ctx = helper.checkLoggedStatus(ctx);

                ctx.loadPartials({
                    footer: './templates/common/footer.hbs',
                    header: './templates/common/header.hbs',
                    menu: './templates/common/menu.hbs',
                    page: './templates/posts/myPosts.hbs',
                    post: './templates/posts/post.hbs',
                    loggedHome: './templates/home/loggedHome.hbs'
                })
                    .then(function () {
                        this.partial('./templates/page.hbs')
                    })
            }).catch(helper.handleError);
    }

    function showPostDetails (ctx) {
        let id = ctx.params.id.substring(1);
        let endPart = `posts/${id}`;
        requester.get('appdata', endPart, 'kinvey')
            .then(post => {
                ctx.url = post.url;
                ctx.title = post.title;
                ctx.imageUrl = post.imageUrl;
                if (post.description === ''){
                    ctx.description = 'No description.'
                }else{
                    ctx.description = post.description;
                }
                ctx._id = post._id;
                ctx.time = helper.calcTime(post._kmd.ect);
                ctx.author = post.author;
                ctx = helper.checkLoggedStatus(ctx);
                ctx.isAuthor = post.author === sessionStorage.getItem('username');

                let endPart = `comments?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`;
                requester.get('appdata', endPart)
                    .then(comments => {
                        comments.map(c =>{
                            "use strict";
                            c.commentTime = helper.calcTime(c._kmd.ect);
                            c.isAuthor = sessionStorage.getItem('username') === c.author;
                        });
                        ctx.username = sessionStorage.getItem('username');
                        ctx.comments = comments;

                            ctx.loadPartials({
                                footer: './templates/common/footer.hbs',
                                header: './templates/common/header.hbs',
                                menu: './templates/common/menu.hbs',
                                page: './templates/details/detailsPage.hbs',
                                loggedHome: './templates/home/loggedHome.hbs',
                                comment: './templates/details/comment.hbs',
                                post: './templates/details/post.hbs',
                                form: './templates/details/commentForm.hbs'
                            }).then(function () {
                                this.partial('./templates/page.hbs');
                            })
                    });
            }).catch(helper.handleError);
    }

    function postComment (ctx) {
        let postId = ctx.params.id.substring(1);
        let content = ctx.params.content;
        let author = sessionStorage.getItem('username');

        requester.post('appdata','comments','kinvey',{postId, content,author})
            .then(function () {
                helper.showInfo('Comment created.');
                ctx.redirect(`#/comments/:${postId}`);
            }).catch(helper.handleError)
    }

    function deleteComment(ctx) {
        let ids = ctx.params.ids.substring(1).split(':');
        let commentId = ids[1];
        let postId = ids[0];
        requester.remove('appdata','comments/' + commentId, 'kinvey')
            .then(function () {
                helper.showInfo('Comment deleted.');
                ctx.redirect('#/comments/:' + postId);
            }).catch(helper.handleError)
    }

    return {
        showCreatePost,
        createPost,
        showEditPost,
        editPost,
        deletePost,
        showPostByUser,
        showPostDetails,
        postComment,
        deleteComment
    }
})()
