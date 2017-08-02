function attachEvents() {
    const url = 'https://baas.kinvey.com/appdata/kid_Bk3ISVJPW';
    const username = 'pesho';
    const password = 'p';

    $('#btnLoadPosts').click(loadPosts);
    $('#btnViewPost').click(viewPost);
    let selectMenu = $('#posts');

    function request(endAddress) {
        return $.ajax({
            url: url + endAddress,
            headers:{
                'Authorization': 'Basic ' + btoa(username + ':' + password)}
        })
    }

    function loadPosts() {
        request('/posts')
        .then(fillOptions)
        .catch(showError);

        function fillOptions(data) {
            selectMenu.empty();

            for (let post of data) {
                $('<option>').text(post.title).val(post._id).appendTo(selectMenu);
            }
        }
    }

    function viewPost() {
        let selectedId = selectMenu.find('option:selected').val();
        if (!selectedId) return;

        let reqPosts = request('/posts/'+ selectedId);
        let reqComments = request(`/comments/?query={"post_id":"${selectedId}"}`);
        Promise.all([reqPosts,reqComments])
            .then(displayPostsAndComments)
            .catch(showError);

        function displayPostsAndComments([post,comments]) {
            console.log(post);
            console.log(comments);
            $('#post-title').text(post.title);
            $('#post-body').text(post.body);
            let commentsTag = $('#post-comments');
            commentsTag.empty();

            for (let comment of comments) {
                $('<li>')
                    .text(comment.text)
                    .appendTo(commentsTag);
            }
        }
    }

    function showError(reason) {
        let errorDiv = $("<div>").text("Error: " +
            reason.status + ' (' + reason.statusText + ')');
        $(document.body).prepend(errorDiv);
        setTimeout(function() {
            $(errorDiv).fadeOut(function() {
                $(errorDiv).remove();
            });
        }, 3000);
    }
}
