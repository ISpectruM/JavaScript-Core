let rgbToHexColor = require('./f_RGBToHex.js').rgbToHexColor;
let expect = require('chai').expect;

describe("Check the funcionality of RGB function", function () {
    it("Should return the color for (255,158,170)", () =>{
        expect(rgbToHexColor(255,158,170)).to.equal('#FF9EAA');
    });

    it("Should pad values with zeroes",() => {
        expect(rgbToHexColor(12,13,14)).to.equal('#0C0D0E');
    });

    it("Should work with zero values",()=>{
        expect(rgbToHexColor(0,0,0)).to.equal('#000000');
    });

    it("Should work with upper limit values", ()=>{
        expect(rgbToHexColor(255,255,255)).to.equal('#FFFFFF');
    });

    it("Should return Undefined if negative values passed",()=>{
        expect(rgbToHexColor(-2,-2,-2)).to.equal(undefined);
    });

    it("Should return Undefined if values above 255 are passed",()=>{
        expect(rgbToHexColor(12,25,256)).to.equal(undefined);
    });
    it("Should return Undefined if values above 255 are passed",()=>{
        expect(rgbToHexColor(25,256,25)).to.equal(undefined);
    });
    it("Should return Undefined if values above 255 are passed",()=>{
        expect(rgbToHexColor(256,25,25)).to.equal(undefined);
    });

    it("Should return Undefined if non integer numbers are passed",()=>{
        expect(rgbToHexColor(3.5,4.6,2.2)).to.equal(undefined);
    });

    it("Should return Undefined if wrong arguments are passed", ()=>{
        expect(rgbToHexColor('asd',{a:2},[])).to.equal(undefined);
    })
});