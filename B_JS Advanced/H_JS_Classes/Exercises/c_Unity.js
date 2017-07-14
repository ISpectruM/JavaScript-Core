class Rat{
    constructor(name){
        this.name = name;
        this.unitedRats = [];
    }

    unite(otherRat){
        if (otherRat.constructor === Rat){
            this.unitedRats.push(otherRat);
        }
    }

    toString(){
        let name = this.name;
        let rats = this.unitedRats.map(r => `##${r.name}`).join('\n');
        return `${name}\n${rats}`;
    }

    getRats(){
        return this.unitedRats;
    }
}

let test = new Rat("Pesho");
console.log(test.toString()); //Pesho

console.log(test.getRats()); //[]

test.unite(new Rat("Gosho"));
test.unite(new Rat("Sasho"));
console.log(test.getRats());
//[ Rat { name: 'Gosho', unitedRats: [] },
//  Rat { name: 'Sasho', unitedRats: [] } ]

console.log(test.toString());
// Pesho
// ##Gosho
// ##Sasho
