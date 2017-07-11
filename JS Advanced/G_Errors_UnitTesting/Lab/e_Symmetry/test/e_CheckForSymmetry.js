let isSymmetric = require('../e_Symmetry').isSymmetric;

let expect = require('chai').expect;
describe("Check symmetry", function () {
    it("Should return false when input is not array", function () {
        expect(isSymmetric(1)).to.equal(false);
    });

    it("Should return false when the input is string", function () {
        expect(isSymmetric('string')).to.equal(false);
    });

    it("Should return false if array is not symmetric", function () {
        expect(isSymmetric([1,2,4,5])).to.equal(false);
    });

    it("Should return true if the array is symmetric", function () {
        expect(isSymmetric([1,2,3,4,3,2,1])).to.equal(true);
    });

    it("Should return true if there are negative numbers in the symmetric array ", function () {
        expect(isSymmetric([1,2,2,-3,-3,2,2,1])).to.equal(true);
    });
    it("Should return false if there are negative numbers in non-symetryc array ", function () {
        expect(isSymmetric([1,2,2,-3,-3,3,2,1])).to.equal(false);
    });

    it("Should return true if there is only one element in the array", function () {
        expect(isSymmetric([1])).to.equal(true);
    });

    it("Should return true if there are symmetric different types in the array", function () {
        expect(isSymmetric([1,'due',3.5,{a:2},{a:2},3.5,'due',1])).to.equal(true);
    });
});

