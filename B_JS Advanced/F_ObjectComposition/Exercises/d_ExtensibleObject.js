function copyObj() {

    return {
        extend: function (template) {

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
}
let obj = copyObj();
obj.extend({
        extensionMethod: function () {
        },
        extensionProperty: 'someString'
    }
);
console.log(Object.getPrototypeOf(obj));