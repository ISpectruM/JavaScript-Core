class Stringer{
    constructor(string, length){
        this.innerString = string;
        this.innerLength = length;
    }

    decrease(length){
        if (this.innerLength - length < 0){
            this.innerLength = 0;
        } else{
            this.innerLength -= length;
        }
    }

    increase(length){
        if (this.innerLength + length < 0){
            this.innerLength = 0;
        } else {
            this.innerLength += length;
        }
    }

    toString(){
        if (this.innerLength < this.innerString.length){
            let newString = this.innerString.slice(0,this.innerLength);
            return newString + '...';
        } else if(this.innerLength === 0){
            return '...';
        } else {
            return this.innerString;
        }
    }
}

let s = new Stringer("Viktor", 6);
s.decrease(9);
console.log(s.innerLength);
let test = new Stringer("Test", 5);
console.log(test.toString()); //Test

test.decrease(3);
console.log(test.toString()); //Te...

test.decrease(5);
console.log(test.toString()); //...

test.increase(4);
console.log(test.toString()); //Test
