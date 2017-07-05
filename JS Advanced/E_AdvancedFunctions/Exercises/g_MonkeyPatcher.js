
let post = {
    id: '1234',
    author: 'author name',
    content: 'these fields are irrelevant',
    upvotes: 4,
    downvotes: 5
};

function solution(command) {

    switch (command){
        case 'upvote':
            return this.upvotes ++;
        case "downvote":
            return this.downvotes ++;
        case "score":
            let upvotes =this.upvotes;
            let downvotes = this.downvotes;
            let totalVotes = upvotes+downvotes;
            let rating ='';
            let balance = (upvotes-downvotes);

            if ((upvotes/totalVotes)*100 > 66 && totalVotes >= 10){
                rating = 'hot';
            }else if(totalVotes <10){
                rating = "new";
            }else if (balance < 0 ){
                rating = 'unpopular';
            } else if(upvotes > 100 || downvotes > 100){
                rating = "controversial";
            } else {
                rating = 'new';
            }

            if (totalVotes > 50){
                let addition = Math.ceil(Math.max(this.upvotes, this.downvotes)*0.25);
                upvotes = this.upvotes + addition;
                downvotes = this.downvotes + addition;
            }

            return [upvotes,downvotes,balance,rating];
    }
}

// console.log(solution.call(post, 'score'));
// solution.call(post, 'downvote')
// console.log(solution.call(post, 'score'));
// solution.call(post, 'upvote');
// solution.call(post, 'upvote');
// console.log(solution.call(post, 'score'));
// for (let i = 0; i < 38; i++) {
//     solution.call(post, 'upvote');
// }
// console.log(solution.call(post, 'score'));
// solution.call(post, 'downvote');
// console.log(solution.call(post, 'score'));
post.upvotes = 132;
post.downvotes = 68;
console.log(solution.call(post, 'score'));
