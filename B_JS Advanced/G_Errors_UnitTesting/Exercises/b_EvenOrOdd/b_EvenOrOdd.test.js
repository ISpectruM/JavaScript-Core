let isOddOrEven = require('./b_EvenOrOdd').isOddOrEven;
let expect = require('chai').expect;

describe("Even or Odd string length", ()=>{
    it("Should return undefined if number is passed as argument",()=>{
        expect(isOddOrEven(5)).to.equal(undefined);
    });

    it("Should return undefined if array is passed as argument",()=>{
        expect(isOddOrEven([1,2])).to.equal(undefined);
    });

    it("Should return undefined if object is passed as argument",()=>{
        expect(isOddOrEven({p:2})).to.equal(undefined);
    });

    it("Should return odd if odd length string is passed as argument",()=>{
        expect(isOddOrEven('salam')).to.equal('odd');
    });

    it("Should return even if even length string is passed as argument",()=>{
        expect(isOddOrEven('salami')).to.equal('even');
    })
});
