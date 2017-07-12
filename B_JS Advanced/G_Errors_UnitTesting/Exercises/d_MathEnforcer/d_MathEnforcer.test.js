let mathEnforcer = require('./d_MathEnforcer').mathEnforcer;
let expect = require('chai').expect;

describe("Test math function",()=> {
    describe("General test",()=>{
        it("Test the variable is of correct type", ()=>{
            expect(typeof mathEnforcer).to.equal('object');
        })
    });

    describe("Test the add functionality",()=>{
        it("Test the add obj param is function", ()=>{
            expect(typeof mathEnforcer.addFive).to.equal('function');
        });

        it("Should return undefined if non-number argument is passed in",()=> {
            expect(mathEnforcer.addFive('d')).to.be.undefined;
            expect(mathEnforcer.addFive({d:2})).to.be.undefined;
            expect(mathEnforcer.addFive(undefined)).to.be.undefined;
            expect(mathEnforcer.addFive('545')).to.be.undefined;
        });

        it("Should return NaN if NaN is passed in",()=>{
            expect(mathEnforcer.addFive(NaN)).to.be.NaN;
        });

        it("Should add 5 if argument is number",()=> {
            expect(mathEnforcer.addFive(5)).to.equal(10);
            expect(mathEnforcer.addFive(0)).to.equal(5);
        });

        it("Should return correct result on fractions",()=>{
            expect(mathEnforcer.addFive(3.5)).to.equal(8.5);
        });

        it("Should return correct result if negative number is passed",()=> {
            expect(mathEnforcer.addFive(-5)).to.equal(0);
        });

        it("Should return undefined if no argument is passed",()=> {
            expect(mathEnforcer.addFive()).to.be.undefined;
        });


    });

    describe("Test the subtract functionality",()=>{
        it("Test the subtractTen obj param is function", ()=>{
            expect(typeof mathEnforcer.subtractTen).to.equal('function');
        });

        it("Should return undefined if non-number argument is passed in",()=> {
            expect(mathEnforcer.subtractTen('d')).to.be.undefined;
            expect(mathEnforcer.subtractTen({d:2})).to.be.undefined;
            expect(mathEnforcer.subtractTen(undefined)).to.be.undefined;
        });

        it("Should return NaN if NaN is passed in",()=>{
            expect(mathEnforcer.subtractTen(NaN)).to.be.NaN;
        });

        it("Should subtract 10 if argument is number",()=> {
            expect(mathEnforcer.subtractTen(10)).to.equal(0);
            expect(mathEnforcer.subtractTen(0)).to.equal(-10);
        });

        it("Should return correct results with fractions",()=>{
            expect(mathEnforcer.subtractTen(10.5)).to.equal(0.5);
        });

        it("Should return correct result if negative number is passed",()=> {
            expect(mathEnforcer.subtractTen(-10)).to.equal(-20);
        });

        it("Should return undefined if no argument is passed",()=> {
            expect(mathEnforcer.subtractTen()).to.be.undefined;
        });
    });

    describe("Test the sum functionality",()=>{
        it("Test the sum obj param is function", ()=>{
            expect(typeof mathEnforcer.sum).to.equal('function');
        });

        it("Should return undefined if first parameter is not a number",()=> {
            expect(mathEnforcer.sum('d',5)).to.be.undefined;
            expect(mathEnforcer.sum(undefined,5)).to.be.undefined;

        });

        it("Should return undefined if second parameter is not a number",()=> {
            expect(mathEnforcer.sum(5,'d')).to.be.undefined;
            expect(mathEnforcer.sum(5,undefined)).to.be.undefined;

        });

        it("Should return undefined if both parameters are not numbers",()=> {
            expect(mathEnforcer.sum('d',{f:4})).to.be.undefined;
            expect(mathEnforcer.sum(undefined,undefined)).to.be.undefined;
        });

        it("Should return correct result if negative number is passed",()=> {
            expect(mathEnforcer.sum(-10,5)).to.equal(-5);
            expect(mathEnforcer.sum(10,-5)).to.equal(5);
            expect(mathEnforcer.sum(-10,-5)).to.equal(-15);
            expect(mathEnforcer.sum(3.5,-5)).to.equal(-1.5);
            expect(mathEnforcer.sum(-10,3.5)).to.equal(-6.5);
        });

        it("Should return correct result on fractions",()=>{
            expect(mathEnforcer.sum(3.5,1.2)).to.equal(4.7);
            expect(mathEnforcer.sum(3.5,5)).to.equal(8.5);
            expect(mathEnforcer.sum(5,3.5)).to.equal(8.5);
        });

        it("Should return correct result on zero values",()=> {
            expect(mathEnforcer.sum(0, 0)).to.equal(0);
        });

        it("Should return undefined if no arguments are passed in",()=> {
            expect(mathEnforcer.sum()).to.be.undefined;
        });

        it("Should return NaN if any of the arguments is NaN",()=>{
            expect(mathEnforcer.sum(NaN,5)).to.be.NaN;
            expect(mathEnforcer.sum(5,NaN)).to.be.NaN;
            expect(mathEnforcer.sum(NaN,NaN)).to.be.NaN;
        })
    })

});
