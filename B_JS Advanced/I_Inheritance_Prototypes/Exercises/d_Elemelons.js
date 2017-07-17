function solve() {
    class Melon {
        constructor(weight, sort) {
            if (new.target === Melon) {
                throw new Error("Cannot instantiate directly");
            }
            this.weight = weight;
            this.melonSort = sort;
            this.element = '';
            this._elementIndex = this.weight * this.melonSort.length;
        }

        get elementIndex() {
            return this._elementIndex;
        }

        toString() {
            return `Element: ${this.element
                }\nSort: ${this.melonSort
                }\nElement Index: ${this.elementIndex}`
        }

    }

    class Watermelon extends Melon {
        constructor(weight, sort) {
            super(weight, sort);
            this.element = 'Water';
        }
    }

    class Firemelon extends Melon {
        constructor(weight, sort) {
            super(weight, sort);
            this.element = 'Fire';
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, sort) {
            super(weight, sort);
            this.element = 'Earth';
        }
    }

    class Airmelon extends Melon {
        constructor(weight, sort) {
            super(weight, sort);
            this.element = 'Air';
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, sort) {
            super(weight, sort);
            this.elements = ['Fire', 'Earth', 'Air', 'Water'];
        }

        morph() {
            let newElement = this.elements.shift();
            super.element = newElement;
            this.elements.push(newElement);
        }
    }

    return{
        Melon: Melon,
        Watermelon:Watermelon,
        Firemelon:Firemelon,
        Earthmelon:Earthmelon,
        Airmelon:Airmelon,
        Melolemonmelon:Melolemonmelon
    }
}
let melon = solve();
let waterm = new melon.Watermelon(25,'s');
console.log(Object.getPrototypeOf(melon.Watermelon));
