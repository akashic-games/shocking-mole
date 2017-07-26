window.gLocalAssetContainer["NumberUI"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var NumberOperator = require("../Utility/NumberOperator");
var NumberUI = (function () {
    function NumberUI(scene, leftpivot) {
        if (leftpivot === void 0) { leftpivot = true; }
        this.leftpivot = leftpivot;
        this.math = new NumberOperator();
        this.digit = 1;
        this.lastdigit = 1;
        this.InitNumbers(scene);
    }
    // numbersの初期化
    NumberUI.prototype.InitNumbers = function (scene) {
        this.numbers = new Array(10);
        for (var i = 0; i < this.numbers.length; i++) {
            this.numbers[i] = new g.FrameSprite({ scene: scene, src: scene.assets["numbers"], width: 32, height: 64 });
            this.numbers[i].frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            scene.append(this.numbers[i]);
        }
    };
    // num: 表示する数値
    NumberUI.prototype.SetNumber = function (num, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.lastdigit = this.digit;
        this.digit = this.math.GetDigitNum(num);
        var digits = this.math.GetDigits(num);
        for (var i = 0; i < this.numbers.length; i++) {
            if (i < this.digit) {
                this.numbers[i].frameNumber = digits[i];
                this.numbers[i].show();
            }
            else {
                this.numbers[i].hide();
            }
        }
        this.SetPosition(x, y);
    };
    // ポジションの設定
    NumberUI.prototype.SetPosition = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        // scale値を考慮した横幅を代入
        var width = this.CalcWidthScale(this.numbers[0].width - 5, this.numbers[0].scaleX);
        // 初期位置のindexが最初か最後から始まるか
        var index = this.leftpivot ? 0 : this.digit - 1;
        // xが何も受け取らなければ初期値はnumbers[index].x
        x = x === 0 ? this.numbers[index].x : x;
        // xが何も受け取らず、さらに次の桁のｘ値が0だったらlastdigit - 1をindexとした値を代入
        x = x === 0 ? this.numbers[this.lastdigit - 1].x : x;
        y = y === 0 ? this.numbers[0].y : y;
        for (var i = 0; i < this.digit; i++) {
            var absindex = Math.abs(index - i);
            this.numbers[absindex].x = this.leftpivot ? x + (width * i) : x - (width * i);
            this.numbers[absindex].y = y;
            this.numbers[absindex].modified();
        }
    };
    // 幅と大きさを乗算した値を返す
    NumberUI.prototype.CalcWidthScale = function (width, scale) {
        return width * scale;
    };
    // スケールの変更
    NumberUI.prototype.Scale = function (magnification) {
        for (var i = 0; i < this.numbers.length; i++) {
            this.numbers[i].scale(magnification);
        }
        this.SetPosition();
    };
    // 透明度の変更
    NumberUI.prototype.Opacity = function (opacity) {
        for (var i = 0; i < this.numbers.length; i++) {
            this.numbers[i].opacity = opacity;
        }
    };
    // 透明度の加算
    NumberUI.prototype.AddOpacity = function (addNum) {
        if (this.numbers[0].opacity >= 1)
            return;
        for (var i = 0; i < this.numbers.length; i++) {
            this.numbers[i].opacity += addNum;
        }
    };
    return NumberUI;
}());
module.exports = NumberUI;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}