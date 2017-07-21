let createList = require('./b_Add_Swap_ShiftLeft_RightList').createList;
let expect = require('chai').expect;

describe("Test list",function () {
    let myList;
    beforeEach(function () {
        myList= createList();
    });
    describe("properties existence",function () {
       it("Should have add property",function () {
           expect(myList.hasOwnProperty('add')).to.be.true;
       });

       it("Should have shiftLeft",function () {
           expect(myList.hasOwnProperty('shiftLeft')).to.be.true;
       });

        it("Should have shiftRight",function () {
            expect(myList.hasOwnProperty('shiftRight')).to.be.true;
        });

        it("Should have swap",function () {
            expect(myList.hasOwnProperty('swap')).to.be.true;
        });

        it("Should have toString",function () {
            expect(myList.hasOwnProperty('toString')).to.be.true;
        })
    });

    describe("Tostring output",function () {
        it("Should return empty initial list",function () {
            expect(myList.toString()).to.equal('');
        });

        it("Output should be string",function () {
            myList.add(1);
            expect(myList.toString()).to.be.a('string');
        })
    });

    describe("Add function",function () {
        it("Shouldn`t add element without parameters",function () {
            myList.add();
            expect(myList.toString()).to.equal('');
        });
        it("Should add element at the end of the list",function () {
            myList.add(1);
            expect(myList.toString()).to.equal('1');
        });

        it("Should add different type many elements",function () {
            myList.add('a');
            myList.add(['a','b']);
            myList.add(3.5);
            expect(myList.toString()).to.equal('a, a,b, 3.5');
        });

        it("Test if it adds object",function () {
            myList.add({a:2});
            expect(myList.toString()).to.equal('[object Object]');
        });

        it("Shoulden`t add elements on multiple parameters",function () {
            myList.add([])
        })
    });

    describe("ShiftLeft function",function () {
        it("Should rotate the elements left", function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            myList.shiftLeft();
            expect(myList.toString()).to.equal('2, 3, 1');
        });

        it("Should rotate the elements twice left", function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            myList.shiftLeft();
            myList.shiftLeft();
            expect(myList.toString()).to.equal('3, 1, 2');
        });

        it("Should stay unchanged on empty list rotation",function () {
            myList.shiftLeft();
            expect(myList.toString()).to.equal('');
        });

        it("Should remain unchanged on single element rotation",function () {
            myList.add(1);
            myList.shiftLeft();
            expect(myList.toString()).to.equal('1');
        })
    });

    describe("ShiftRight function",function () {
        it("Should rotate the elements right", function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            myList.shiftRight();
            expect(myList.toString()).to.equal('3, 1, 2');
        });

        it("Should rotate the elements twice left", function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            myList.shiftRight();
            myList.shiftRight();
            expect(myList.toString()).to.equal('2, 3, 1');
        });

        it("Should stay unchanged on empty list rotation",function () {
            myList.shiftRight();
            expect(myList.toString()).to.equal('');
        });

        it("Should remain unchanged on single element rotation",function () {
            myList.add(1);
            myList.shiftRight();
            expect(myList.toString()).to.equal('1');
        })
    });

    describe("Swap function",function () {
        it("Should swap the place of existing elements in list",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            myList.swap(0,2);
            expect(myList.toString()).to.equal('3, 2, 1');
        });

        it("Should return true on successful swap",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            expect(myList.swap(0,2)).to.be.true;
        });

        //Non-integer indexes
        it("Should return false on non-integer first index",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap('a',2)).to.be.false;
            expect(myList.swap(3.5,2)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });
        it("Should return false on non-integer second index",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(0,'a')).to.be.false;
            expect(myList.swap(0,3.5)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });
        it("Should return false on non-existing indexes",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(8,10)).to.be.false;
            expect(myList.swap('a','a')).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });

        //Negative indexes
        it("Should return false on negative first index",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(-1,2)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });
        it("Should return false on negative second index",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(0,-2)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });
        it("Should return false on negative indexes",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(-1,-2)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });
        it("Should return false on first negative and second zero indexes",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(-1,0)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });

        //Out of boundary indexes
        it("Should return false if first index is bigger than the list length",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(4,2)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });
        it("Should return false if second index is bigger than the list length",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(0,4)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });
        it("Should return false if both indexes are bigger than the list length",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(4,5)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });

        //Equal to list length indexes
        it("Should return false if first index equals the list length",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(3,2)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });
        it("Should return false if second index equals the list length",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(0,3)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });
        it("Should return false if both indexes equals the list length",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            expect(myList.swap(3,3)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });

        it("Should return false on equal indexes",function () {
            myList.add(1);
            myList.add(1);
            let oldString = myList.toString();
            expect(myList.swap(1,1)).to.be.false;
            expect(myList.toString()).to.equal(oldString);

        });

        it("The collection stays unchanged on invalid index",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            let oldString = myList.toString();
            myList.swap(0,0);
            myList.swap(-1,10);
            myList.swap(-1,3);
            myList.swap(0,5);
            myList.swap('a',{});
            expect(myList.toString()).to.equal(oldString);
        });
        it("With second zero index",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            expect(myList.swap(1,0)).to.be.true;
            expect(myList.toString()).to.equal('2, 1, 3');

        });
        it("With first zero index",function () {
            myList.add(1);
            myList.add(2);
            myList.add(3);
            expect(myList.swap(0,2)).to.be.true;
            expect(myList.toString()).to.equal('3, 2, 1');

        });

    });
});

