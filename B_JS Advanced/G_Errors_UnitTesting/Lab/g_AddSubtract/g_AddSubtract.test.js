let createCalculator = require('./g_AddSubtract').createCalculator;
let expect = require('chai').expect;

describe("Test functionality of thecalculator",()=> {
    let calc;
    beforeEach(()=>{
        calc = createCalculator();
    });

    it("Should return an object",()=>{
        expect(typeof calc).to.equal('object');
    });

    it("Should return 0 value when initialized",()=>{
        expect(calc.get()).to.equal(0);
    });

    it("Should return 3 on using add(1), add(2)", ()=>{
        calc.add(1);
        calc.add(2);
        expect(calc.get()).to.equal(3);
    });

    it("Should return -1 when subtracting 1)", ()=>{
        calc.subtract(1);
        expect(calc.get()).to.equal(-1);
    });

    it("Should return sum adding numbers as strings", ()=>{
        calc.add('1');
        calc.add('2');
        expect(calc.get()).to.equal(3);
    });

    it("Shoud not add NaNs",()=>{
        calc.add('asd');
        expect(calc.get()).to.be.NaN;
    });

    it("Shoud not subtract NaNs",()=>{
        calc.subtract('asd');
        expect(calc.get()).to.be.NaN;
    });

    it("Should work with fractions",()=>{
        calc.add(1.2);
        calc.subtract(1);
        expect(calc.get()).to.be.closeTo(0.2,0.001);
    })
});
