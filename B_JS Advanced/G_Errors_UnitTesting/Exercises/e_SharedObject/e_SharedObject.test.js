let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let sharedObject = require('./e_SharedObject').sharedObject;
let $ = require('jquery');

document.body.innerHTML = `<body>
<div id="wrapper">
    <input type="text" id="name">
    <input type="text" id="income">
</div>
</body>`;

describe("Sharedobject tests",function () {
    let inputName;
    let inputIncome;
    beforeEach(()=>{
        inputName = $('#name');
        inputIncome = $('#income');
    });

    describe("Test initial values",function () {
        it("Name should be Null",function () {
            expect(sharedObject.name).to.be.null;
        });
        it("Income should be null", function () {
            expect(sharedObject.income).to.be.null;
        });

        it("The name input field should be ''",function () {
            let inp = $('#name');
            expect(inp.val()).to.equal('');
        });

        it("The income input field should be ''",function () {
            let inp = $('#income');
            expect(inp.val()).to.equal('');
        });

    });

    describe("Test changeName functionality",function () {
        it("No change in the name on empty string",function () {
            sharedObject.changeName("");
            expect(sharedObject.name).to.be.null;
        });

        it("No change in the income on empty string",function () {
            sharedObject.changeIncome("");
            expect(sharedObject.income).to.be.null;
        });

        it("Should change name when a non-empty string is passed in",function () {
            sharedObject.changeName("Peter");
            expect(sharedObject.name).to.equal("Peter", "Name did not changed");
        });

        describe("Name input tests",function () {
            it("Should not change on empty string",function () {
                sharedObject.changeName('Peter');
                sharedObject.changeName("");
                expect(inputName.val()).to.equal('Peter','Name changed with empty string')
            });

            it("Should change on non-empty string",function () {
                sharedObject.changeName('Paskal');
                expect(inputName.val()).to.equal('Paskal', 'The name did not change on non-empty string');
            })
        })
    });

    describe("Test the changeIncome functionality",function () {
        it("No change in the income on negative value",function () {
            sharedObject.changeIncome(-2);
            expect(sharedObject.income).to.be.null;
        });

        it("Should change income when a non-negative number is passed in",function () {
            sharedObject.changeIncome(20);
            expect(sharedObject.income).to.equal(20, "Income changed on zero value");
        });

        it("Should not change on zero value",function () {
            sharedObject.changeIncome(30);
            sharedObject.changeIncome(0);
            expect(sharedObject.income).to.equal(30, "Income did not changed");
        });

        it("Should not change on non-integer value",function () {
            sharedObject.changeIncome(40);
            sharedObject.changeIncome(3.5);
            expect(sharedObject.income).to.equal(40, "Income changed");
            sharedObject.changeIncome('asd');
            expect(sharedObject.income).to.equal(40, "Income changed");
            sharedObject.changeIncome({A:2});
            expect(sharedObject.income).to.equal(40, "Income changed");
        });


        describe("Income input field tests",function () {
            it("Should change on non-negative integer",function () {
                sharedObject.changeIncome(30);
                expect(inputIncome.val()).to.equal("30", 'The income did not change on non-negative integer');
            });

            it("Should not change when negative value is passed in",function () {
                sharedObject.changeIncome(5)
                sharedObject.changeIncome(-2);
                expect(inputIncome.val()).to.equal("5",'Income field changed with negative value')
            });

            it("Should not change when non-intger value is passed in",function () {
                sharedObject.changeIncome(10);
                sharedObject.changeIncome(3.5);
                sharedObject.changeIncome('asd');
                sharedObject.changeIncome({a:2});
                expect(inputIncome.val()).to.equal("10",'Income field changed with non-integer value')
            });

            it("Should not change when zero value is passed in",function () {
                sharedObject.changeIncome(15);
                sharedObject.changeIncome(0);
                expect(inputIncome.val()).to.equal("15",'Income field changed with zero value')
            });
        })
    });

    describe("Test the updateName functionality",function () {
        it("Should change the name value on non-empty string as input",function () {
            sharedObject.changeName('Pen');
            inputName.val('Sara');
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('Sara');
        });

        it("Should not change the name value on empty string as input",function () {
            sharedObject.changeName('Zoltan');
            inputName.val('');
            sharedObject.updateName();
            expect(sharedObject.name).to.equal('Zoltan');
        });
    });

    describe("Test updateIncome",function () {
        it("Should update on integer",function () {
            sharedObject.changeIncome(50);
            inputIncome.val('45');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(45);
        });

        it("Should not update if input is NaN",function () {
            sharedObject.changeIncome(53);
            inputIncome.val(NaN);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(53);
        });

        it("Should not update if input is not integer",function () {
            sharedObject.changeIncome(53);
            inputIncome.val(3.5);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(53);
        });

        it("Should not update if input is zero",function () {
            sharedObject.changeIncome(53);
            inputIncome.val(0);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(53);
        });

        it("Should not update if input is negative",function () {
            sharedObject.changeIncome(53);
            inputIncome.val(-2);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.equal(53);
        })
    })
});