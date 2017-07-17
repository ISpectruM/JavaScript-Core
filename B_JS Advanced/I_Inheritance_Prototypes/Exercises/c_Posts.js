function solve() {
    class Post{
        constructor(title,content){
            this.title = title;
            this.content = content;
        }

        toString(){
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post{
        constructor(title,content,likes,dislikes){
            super(title,content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment){
            this.comments.push(comment);
        }

        toString(){
            let rating = this.likes-this.dislikes;
            let result = `${super.toString()}\nRating: ${rating}`;
                if (this.comments.length > 0){
                    result += `\nComments:\n${this.comments.map(c => ` * ${c}`).join('\n')}`
                }
            return result.trim();
        }
    }

    class BlogPost extends Post{
        constructor(title,content,views){
            super(title,content);
            this.views = views;
        }

        view(){
            this.views ++;
            return this;
        }

        toString(){
            return `${super.toString()}\nViews: ${this.views}`;
        }
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}
let posts = solve();
let post = new posts.Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new posts.SocialMediaPost("TestTitle", "TestContent", 25, 30);

scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");

console.log(scm.toString());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!

let blPost = new posts.BlogPost("TestTitle", "TestContent", 5);
console.log(blPost.toString());
