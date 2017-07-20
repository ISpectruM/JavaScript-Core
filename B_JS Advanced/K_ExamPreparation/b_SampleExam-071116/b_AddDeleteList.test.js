let list= require('./b_AddDeleteList');
let expect = require('chai').expect;

describe("Test list",function () {
    describe("Initital test",function () {
        it("Should have add property",function () {
            expect(list.hasOwnProperty('add')).to.be.true;
        });
        it("Should have delete property",function () {
            expect(list.hasOwnProperty('delete')).to.be.true;
        });
        it("Should have toString property",function () {
            expect(list.hasOwnProperty('toString')).to.be.true;
        });
    });
    describe("Add function",function () {
        it("Should add element",function () {
            list.add(1);
            expect(list.toString()).to.equal('1');
            list.delete(0);
        });

        it("Should add element at the end of the list",function () {
            list.add('a');
            list.add('a');
            list.add('end');
            expect(list.toString()).to.equal('a, a, end');
            list.delete(0);
            list.delete(0);
            list.delete(0);
        })
    });

    describe("Delete function",function () {
        it("Should delete element on the specified index",function () {
            list.add(1);
            list.add(2);
            list.delete(1);
            expect(list.toString()).to.equal('1');
            list.delete(0);
        });

        it("Should return the deleted element",function () {
            list.add('a');
            expect(list.delete(0)).to.equal('a');
            list.delete(0);
        });

        it("Return undefined if outside array index is passed in",function () {
            list.add(1);
            expect(list.delete(10)).to.be.undefined;
            list.delete(0);
        });
        it("Should return undefined without arguments",function () {
            expect(list.delete()).to.be.undefined;
        });
        it("Return undefined on negative index",function () {
            expect(list.delete(-1)).to.be.undefined;
        });
        it("Return undefined if non-integer is passed in",function () {
            expect(list.delete(3.5)).to.be.undefined;
        });
        it("Return undefined if string is passed in",function () {
            expect(list.delete('as')).to.be.undefined;
        })
    });

    describe("String function",function () {
        it("Return a string",function () {
            list.add(1);
            list.add(2);
            list.add(3);
            expect(list.toString()).to.be.a('string');
        });

        it("Returns the elements separated by coma delimiter",function () {
            expect(list.toString()).to.equal('1, 2, 3');
        })
    })
});
