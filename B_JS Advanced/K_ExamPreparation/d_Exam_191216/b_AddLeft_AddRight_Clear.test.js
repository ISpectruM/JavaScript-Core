let makeList = require('./b_AddLeft_AddRight_Clear');
let expect = require('chai').expect;

describe("Test list",function () {
    let myList = {};
    beforeEach(function () {
        myList = makeList();
    });
    describe('Initial tests',function () {
        it("Should be empty",function () {
            expect(myList.toString()).to.equal('');
        })
    });

    describe("Add left",function () {
       it("Should add element",function () {
           myList.addLeft(1);
           expect(myList.toString()).to.equal('1');
       });

       it("Added element should be on the left",function () {
           myList.addLeft(1);
           myList.addLeft(2);
           myList.addLeft(3);
           expect(myList.toString()).to.equal('3, 2, 1');
       });

       it("Should add empty strings",function () {
           myList.addLeft();
           myList.addLeft();
           myList.addLeft();
           expect(myList.toString()).to.equal(', , ');
       });

       it("Should add an empty input",function () {
           myList.addLeft(1);
           myList.addLeft(2);
           myList.addLeft(3);
           myList.addLeft();
           expect(myList.toString()).to.equal(', 3, 2, 1');
       });

       it("Should add string to collection",function () {
           myList.addLeft(1);
           myList.addLeft('string');
           expect(myList.toString()).to.equal('string, 1');
       });

       it("Add fractions",function () {
           myList.addLeft(1.5);
           myList.addLeft(2.5);
           myList.addLeft(3.5);
           expect(myList.toString()).to.equal('3.5, 2.5, 1.5');
       });

       it("Should add objects",function () {
           myList.addLeft({a:1});
           myList.addLeft({b:2});
           myList.addLeft({c:3});
           expect(myList.toString()).to.equal('[object Object], [object Object], [object Object]');
       });

        it("Should add undefined on the left",function () {
            myList.addLeft(1);
            myList.addLeft(undefined);
            expect(myList.toString()).to.equal(', 1');
        });

        it("Should add zero on the left",function () {
            myList.addLeft(1);
            myList.addLeft(0);
            expect(myList.toString()).to.equal('0, 1');
        })

    });

    describe("Add right",function () {
        it("Should add element",function () {
            myList.addRight(1);
            expect(myList.toString()).to.equal('1');
        });

        it("Added element should be on the right",function () {
            myList.addRight(1);
            myList.addRight(2);
            myList.addRight(3);
            expect(myList.toString()).to.equal('1, 2, 3');
        });

        it("Should add empty strings",function () {
            myList.addRight();
            myList.addRight();
            myList.addRight();
            expect(myList.toString()).to.equal(', , ');
        });

        it("Should add an empty input",function () {
            myList.addRight(1);
            myList.addRight(2);
            myList.addRight(3);
            myList.addRight();
            expect(myList.toString()).to.equal('1, 2, 3, ');
        });

        it("Should add string to collection",function () {
            myList.addRight(1);
            myList.addRight('string');
            expect(myList.toString()).to.equal('1, string');
        });

        it("Add fractions",function () {
            myList.addRight(1.5);
            myList.addRight(2.5);
            myList.addRight(3.5);
            expect(myList.toString()).to.equal('1.5, 2.5, 3.5');
        });

        it("Should add objects",function () {
            myList.addRight({a:1});
            myList.addRight({b:2});
            myList.addRight({c:3});
            expect(myList.toString()).to.equal('[object Object], [object Object], [object Object]');
        });

        it("Should add undefined on the right",function () {
            myList.addRight(1);
            myList.addRight(undefined);
            expect(myList.toString()).to.equal('1, ');
        });

        it("Should add zero on the right",function () {
            myList.addRight(1);
            myList.addRight(0);
            expect(myList.toString()).to.equal('1, 0');
        })
    });

    describe("Simultaneously add left and right",function () {
        it("Should add element on both sides",function () {
            myList.addRight(0);
            myList.addRight(2);
            myList.addLeft(3);
            myList.addLeft(4);
            expect(myList.toString()).to.equal('4, 3, 0, 2');
        });

        it("Should add element on both sides",function () {
            myList.addRight(0);
            myList.addLeft(2);
            myList.addRight(3);
            myList.addLeft(4);
            expect(myList.toString()).to.equal('4, 2, 0, 3');
        });
    });

    describe("Clear command",function () {
        it("Should be empty on clear empty list",function () {
            myList.clear();
            expect(myList.toString()).to.equal('');
        });

        it("Clear collection of empty strings",function () {
            myList.addLeft();
            myList.addLeft();
            myList.addLeft();
            myList.clear();
            expect(myList.toString()).to.equal('');
        });

        it("Should add-clear-add to collection",function () {
            myList.addLeft(1);
            myList.addRight(2);
            myList.clear();
            myList.addRight(3);
            myList.addLeft(4);
            expect(myList.toString()).to.equal('4, 3');
        })
    })
});
