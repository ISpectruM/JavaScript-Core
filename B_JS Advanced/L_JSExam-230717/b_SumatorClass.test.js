let Sumator = require('./b_SumatorClass');
let expect = require('chai').expect;

describe("Test summator class", function() {
    let list;
    beforeEach(function () {
        list = new Sumator();
    });
    describe("Initial tests",function () {
        it("Has a constructor", function() {
            expect(Object.getPrototypeOf(list).hasOwnProperty('constructor')).to.be.true;
        });

        it("Has add function",function () {
            expect(Object.getPrototypeOf(list).hasOwnProperty('add')).to.be.true;
        });

        it("Has sumNums function",function () {
            expect(Object.getPrototypeOf(list).hasOwnProperty('sumNums')).to.be.true;
        });

        it("Has removeByFilter function",function () {
            expect(Object.getPrototypeOf(list).hasOwnProperty('removeByFilter')).to.be.true;
        });

        it("Has toString function",function () {
            expect(Object.getPrototypeOf(list).hasOwnProperty('toString')).to.be.true;
        });

        it("list property", function () {
            expect(list.hasOwnProperty('data')).to.be.true;
        });

        it("Data is array",function () {
            expect(list.data).to.be.a('array');
        });

        it("Empty list on initialising", function () {
            expect(list.data.length).to.equal(0);
        })
    });

    describe("Test Add",function () {
        it("Should add empty string",function () {
            list.add();
            expect(list.toString()).to.equal('');
        });

        it("Add single item",function () {
            list.add(1);
            expect(list.toString()).to.equal('1');
        });

        it("Add multiple items",function () {
            list.add(1);
            list.add(2);
            list.add(3);
            expect(list.toString()).to.equal('1, 2, 3');
        });

        it("Add multiple type items",function () {
            list.add(1);
            list.add(2.5);
            list.add('a');
            list.add({a:2});
            expect(list.toString()).to.equal('1, 2.5, a, [object Object]');
        });

        it('Add zeroes',function () {
            list.add(0);
            expect(list.toString()).to.equal('0');
        });
    });

    describe("Test sumNums",function () {
        it("Return zero when no numbers in list",function () {
            list.add('a');
            list.add([]);
            list.add({a:2});
            expect(list.sumNums()).to.equal(0);
        });

        it("Return zero when summing zeroes",function () {
            list.add(0);
            list.add('a');
            list.add(0);
            expect(list.sumNums()).to.equal(0);
        });

        it("Return correct sum with positive numbers",function () {
            list.add(1);
            list.add('a');
            list.add(2);
            expect(list.sumNums()).to.equal(3);
        });

        it("Return correct sum with negative numbers",function () {
            list.add(-1);
            list.add('a');
            list.add(-2);
            expect(list.sumNums()).to.equal(-3);
        });

        it("Return correct sum with negative and positive numbers",function () {
            list.add(-1);
            list.add('a');
            list.add(3);
            expect(list.sumNums()).to.equal(2);
        });

        it("Return correct sum with fractions",function () {
            list.add(1.5);
            list.add('a');
            list.add(2.3);
            expect(list.sumNums()).to.be.closeTo(0.00001,3.8);
        });

    });

    describe("Test removeByFilter", function () {
        it("Should remove even numbers",function () {
            list.add(1);
            list.add('a');
            list.add(2);
            list.removeByFilter(x => x % 2 === 0);
            expect(list.toString()).to.equal('1, a');
        });

        it("Should remove odd numbers",function () {
            list.add(1);
            list.add('a');
            list.add(2);
            list.removeByFilter(x => x % 2 === 1);
            expect(list.toString()).to.equal('a, 2');
        });

        it("Should remove zeroes",function () {
            list.add(1);
            list.add('a');
            list.add(0);
            list.removeByFilter(x => x === 0);
            expect(list.toString()).to.equal('1, a');
        });

        it("Should remove matched string",function () {
            list.add(1);
            list.add('a');
            list.add(2);
            list.removeByFilter(x => x === 'a');
            expect(list.toString()).to.equal('1, 2');
        });
    });

    describe("Test toString",function () {
        it("Return string",function () {
            list.add(1);
            list.add('a');
            list.add(2);
            expect(list.toString()).to.be.a('string');
        });

        it("Return comma separated string",function () {
            list.add(1);
            list.add('a');
            list.add(2);
            expect(list.toString()).to.equal('1, a, 2');
        });

        it("Return '(empty)' on empty list",function () {
            expect(list.toString()).to.equal('(empty)');
        })


    })

});

