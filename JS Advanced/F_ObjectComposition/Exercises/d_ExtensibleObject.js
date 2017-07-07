function copyObj() {

    return {
        extend: function (template) {

            for (let prop in template) {
                if (typeof template[prop] === 'function') {
                    let proto = Object.getPrototypeOf(this);
                    proto[prop] = template[prop];

                } else {
                    this[prop] = template[prop];
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