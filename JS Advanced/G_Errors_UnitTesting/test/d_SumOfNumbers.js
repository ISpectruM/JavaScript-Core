function sum(arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}


let expect = require('chai').expect;
describe("Sum numbers", function () {
   it("Should return 3 for [1,2]", function () {
       expect(sum([1,2])).to.equal(3);
   });

    it("Should return 1 for [1]", function () {
        expect(sum([1])).to.equal(1);
    });

    it("Should return 0 for []", function () {
        expect(sum([])).to.equal(0);
    });

    it("Should work with negative numbers", function () {
        expect(sum([-1,-2,0])).to.equal(-3);
    });

    it("Should return 4 for [1.5,1.5,1]", function () {
        expect(sum([1.5,1.5,1])).to.equal(4);
    });

    it("Should return NaN for ['five',1.5,1]", function () {
        expect(sum(['five',1.5,1])).to.be.NaN;
    });
});
