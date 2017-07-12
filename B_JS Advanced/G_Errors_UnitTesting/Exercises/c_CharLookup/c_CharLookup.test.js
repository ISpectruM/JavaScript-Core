let lookupChar = require('./c_CharLookup').lookupChar;
let expect = require('chai').expect;

describe("Char lookups",()=>{
    it("Should return Undefined if the first arg is on string",()=> {
        expect(lookupChar(3,3)).to.be.undefined;
    });

    it("Should return undefined if the second arg is not integer",()=>{
        expect(lookupChar('char','c')).to.be.undefined;
    });

    it("Should return undefined if the second arg is not integer",()=>{
        expect(lookupChar('char',3.5)).to.be.undefined;
    });

    it("Should return Incorrect index if index is negative value",()=>{
        expect(lookupChar('char',-1)).to.equal('Incorrect index');
    });

    it("Should return undefined if both arg aren`t correct",()=>{
        expect(lookupChar(3,'c')).to.be.undefined;
    });

    it("Should return Incorrect index if index is bigger than the string length",()=>{
        expect(lookupChar('char',5)).to.equal('Incorrect index');
    });

    it("Should return undefined if no args are passed in",()=>{
        expect(lookupChar()).to.be.undefined;
    });
    it("Should return undefined if no index is passed in",()=>{
        expect(lookupChar('string')).to.be.undefined;
    });

    it("Should return 'Incorrect index' when string is empty",()=>{
        expect(lookupChar('',0)).to.equal('Incorrect index');
    });

    it("Should return space when string contains space on the index",()=>{
        expect(lookupChar(' ',0)).to.equal(' ');
    });

    it("Should return the correct char at given index",()=>{
        expect(lookupChar('String ',1)).to.equal('t');
    });
});
