(function addFunctions() {

    String.prototype.ensureStart = function (start){
        if (!this.startsWith(start)){
            return '' +start + this;
        }
        return ''+ this;
    };

    String.prototype.ensureEnd = function (end) {
        if (!this.endsWith(end)){
            return ''+this + end;
        }
        return ''+ this;
    };

    String.prototype.isEmpty = function () {
        return this.length === 0;
    };

    String.prototype.truncate = function (n) {
        if (n < 4){
            return '.'.repeat(n);
        } else if (this.length <= n){
            return ''+this;
        } else {
            if (this.includes(' ')){
                let splitted = this.split(' ');
                for (let i = splitted.length-1; i > 0; i--) {

                    splitted.length = i;
                    let string = splitted.join(' ');
                    let lettersCount = string.length;

                        if (lettersCount+3 <= n){
                            return ''+string+'...';
                        }
                }
            } else {
                return ''+ this.slice(0,(n-3)) + '...';
            }
        }
    };

    String.format = function () {
        let pattern = /{(\d)}/g;
        let string = arguments[0];
        let params = Array.from(arguments).slice(1);
        let matchArr;
        while((matchArr = pattern.exec(string)) !== null){
            let placeNum = Number(matchArr[1]);
            if (placeNum <= params.length-1) {
                string = string.replace(matchArr[0], params[placeNum]);
            }
        }
        return string;
    };
})();

let testString = 'the quick brown fox jumps over the lazy dog';
let answer = testString.truncate(10);
console.log(answer);
answer = testString.truncate(25);
console.log(answer);
answer = testString.truncate(43);
console.log(answer);
answer = testString.truncate(45);
console.log(answer);
