function createDeckOfCards(arr) {
    let deck = [];

    for (let card of arr) {
        let face = card.substring(0,card.length-1);
        let suit = card[card.length-1];

        try{
            deck.push(makeCard(face,suit))
        } catch (err){
            console.log(`Invalid card: ${card}`);
            return;
        }
    }

    return console.log(deck.join(' '));

    function makeCard(face, suit) {
        const validFaces = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        const validSuits = ['S','H','C','D'];
        if (!validFaces.includes(face)){
            throw new Error("Invalid face");
        }
        if (!validSuits.includes(suit)){
            throw new Error("Invalid suit");
        }

        return {
            face: face,
            suit:suit,
            toString: ()=>{
                let suitCodes = {
                    'S':"\u2660",
                    'H':"\u2665",
                    'D':"\u2666",
                    'C':"\u2663"
                };

                return `${face}${suitCodes[suit]}`
            }
        }
    }
}

createDeckOfCards(['AS', '10D', 'KH', '2C']);
// createDeckOfCards(['5S', '3D', 'QD', '1C']);
