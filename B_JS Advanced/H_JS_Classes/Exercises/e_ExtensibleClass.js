let Extensible = (function() {
    let id = 0;

    return class Extensible{
        constructor(){
            this.id = id++;
        }

        extend(template) {
            for (let prop in template) {
                let propValue = template[prop];
                if (typeof propValue === 'function') {
                    let proto = Object.getPrototypeOf(this);
                    proto[prop] = propValue;

                } else {
                    this[prop] = propValue;
                }
            }
        }

    }
})();

let obj1 = new Extensible();
let obj2 = new Extensible();
let obj3 = new Extensible();
let template = {
    extensionMethod: function () {},
    extensionProperty: 'someString'
};
obj1.extend(template)
console.log(obj1);
console.log(obj2);
console.log(obj3);
