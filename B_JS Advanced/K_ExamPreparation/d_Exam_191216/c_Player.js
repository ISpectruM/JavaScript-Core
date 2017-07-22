class Player{
    constructor(nickName){
        this.nickName = nickName;
        this.scores = [];
    }

    addScore(score){
        if (score !== null && !isNaN(score)){
            this.scores.push(+score);
            this.scores.sort((s1,s2)=> s2-s1);
        }
        return this
    }

    get scoreCount(){
        return this.scores.length;
    }

    get highestScore(){
        return this.scores[0];
    }

    get topFiveScore(){
        return this.scores.slice(0,5);
    }

    toString(){
        return `${this.nickName}: [${this.scores}]`;
    }
}

let player = new Player('Misho');

player.addScore(130);
player.addScore(240);
player.addScore(0);
player.addScore('Pesho');
console.log(player.toString());

let maria = new Player("Maria");
maria.addScore(350);
maria.addScore(779);
maria.addScore(180);
maria.addScore(1870);
maria.addScore(18);
maria.addScore(10);
maria.addScore(190);
console.log(maria.scores);
console.log('Highest score: ' + maria.highestScore);
console.log(`Top 5 score: [${maria.topFiveScore}]`);
console.log('' + maria);