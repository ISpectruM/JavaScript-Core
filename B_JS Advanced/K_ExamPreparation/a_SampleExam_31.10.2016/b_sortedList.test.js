let SortedList = require('./b_SortedList');
let expect = require('chai').expect;

describe("Test sorted list", function () {
    describe("Test if the functions are present",function () {
        it("The class should have add() function",function () {
            console.log(Object.getPrototypeOf(SortedList));
            expect(SortedList.prototype.hasOwnProperty('add')).to.be.true;
        });
        it("The class should have remove() function",function () {
            expect(SortedList.prototype.hasOwnProperty('remove')).to.be.true;
        });
        it("The class should have get() function",function () {
            expect(SortedList.prototype.hasOwnProperty('get')).to.be.true;
        });
        it("The class should have size() function",function () {
            expect(SortedList.prototype.hasOwnProperty('size')).to.be.true;
        })
    });

    let list;
    beforeEach(function () {
        list = new SortedList();
    });

    describe("Test initial list",function () {
        it("Should be empty on initialising",function () {
            expect(list.size).to.equal(0);
        })
    });

    describe("Test add function",function () {
        it("Should add element",function () {
            list.add(5);
            expect(list.list[0]).to.equal(5);
        });

        it("Should increase the size after add",function () {
            list.add(3);
            list.add(3);
            expect(list.size).to.equal(2);
        });

        it("Should remain sorted when adding elements", function () {
            list.add(1);
            list.add(7);
            list.add(2);
            expect(list.list[2]).to.equal(7);
            expect(list.list[1]).to.equal(2);
        })
    });

    describe("Test remove function",function () {
        it("Should remove element on the index", function () {
            list.add(1);
            list.add(2);
            list.remove(0);
            expect(list.size).to.equal(1);
        });

        it("Should throw error on empty list",function () {
            expect(()=>list.remove(0)).throw(Error,'Collection is empty.');
        });

        it("Should throw error when invalid index is passed in",function () {
            list.add(1);
            list.add(2);
            expect(()=>list.remove(2)).throw(Error,'Index was outside the bounds of the collection.');
        });

        it("Should throw error when negative index is passed in",function () {
            list.add(2);
            expect(()=> list.remove(-2)).throw(Error,'Index was outside the bounds of the collection.')
        });

    });

    describe("Test get function",function () {
        it("Should return the number on the index",function () {
            list.list[2] = 3;
            expect(list.get(2)).to.equal(3);
        });

        it("Should throw error on empty list",function () {
            expect(()=>list.get(0)).throw(Error,'Collection is empty.');
        });

        it("Should throw error when invalid index is passed in",function () {
            list.add(1);
            list.add(2);
            expect(()=>list.get(2)).throw(Error,'Index was outside the bounds of the collection.');
        });

        it("Should throw error when negative index is passed in",function () {
            list.add(2);
            expect(()=> list.get(-2)).throw(Error,'Index was outside the bounds of the collection.')
        });
    });

    describe("Test the size getter",function () {
        it("Should return correct size of the collection",function () {
            list.add(1);
            list.add(1);
            list.add(1);
            expect(list.size).to.equal(3);
        });
        it("Should return zero on empty list",function () {
            expect(list.size).to.equal(0);
        })
    })
});
