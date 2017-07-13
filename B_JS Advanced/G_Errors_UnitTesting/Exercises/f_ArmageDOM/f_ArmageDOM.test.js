let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let nuke = require('./f_ArmageDOM').nuke;
let $ = require('jquery');

describe("ArmageDOM tests",function () {
    let targetHtml;
    beforeEach(function () {
        document.body.innerHTML = `<body>
<div id="target">
    <div class="nested target">
        <p>This is some text</p>
    </div>
    <div class="target">
        <p>Empty div</p>
    </div>
    <div class="inside">
        <span class="nested">Some more text</span>
        <span class="target">Some more text</span>
    </div>
</div>
</body>`;
        targetHtml = $('#target')
    });

    it("First valid second invalid",function () {
        let selector1 = $('.inside');
        let selector2 = 2;
        let oldHtml = targetHtml.html();
        nuke(selector1,selector2);
        expect(targetHtml.html()).to.be.equal(oldHtml,"Html has changed");
    });

    it("First invalid second valid",function () {
        let selector1 = 2;
        let selector2 = $('.inside');
        let oldHtml = targetHtml.html();
        nuke(selector1,selector2);
        expect(targetHtml.html()).to.be.equal(oldHtml,"Html has changed");
    });

    it("With equal selectors",function () {
        let selector1 = $('.inside');
        let oldHtml = targetHtml.html();
        nuke(selector1,selector1);
        expect(targetHtml.html()).to.be.equal(oldHtml,"Html has changed");
    });

    it("With invalid selectors",function () {
        let selector1 = $(34);
        let selector2 = $(45);
        let oldHtml = targetHtml.html();
        nuke(selector1,selector2);
        expect(targetHtml.html()).to.be.equal(oldHtml,"Html has changed");
    });

    it("With valid selectors",function () {
        let selector1 = $('.nested');
        let selector2 = $('.target');
        let oldHtml = targetHtml.html();
        nuke(selector1,selector2);
        expect(targetHtml.html()).to.not.equal(oldHtml,"Html has changed");
    });

    it("With valid selectors",function () {
        let selector1 = $('.nested');
        let selector2 = $('.inside');
        let oldHtml = targetHtml.html();
        nuke(selector1,selector2);
        expect(targetHtml.html()).to.equal(oldHtml,"Html has changed");
    })
});
