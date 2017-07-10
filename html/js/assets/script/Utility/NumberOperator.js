window.gLocalAssetContainer["NumberOperator"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var NumberOperator = (function () {
    function NumberOperator() {
    }
    // 引数の値の桁数
    NumberOperator.prototype.GetDigitNum = function (num) {
        var digit = 0;
        var remainder = num;
        while (remainder >= 10) {
            digit += 1;
            remainder = remainder / 10;
        }
        return digit + 1;
    };
    // 引数の値の桁毎の数値
    NumberOperator.prototype.GetDigits = function (num) {
        var digits = new Array(this.GetDigitNum(num));
        var digipow = Math.pow(10, this.GetDigitNum(num) - 1);
        var remainder = num;
        for (var i = 0; i < digits.length; i++) {
            digits[i] = Math.floor(remainder / digipow);
            remainder = remainder % digipow;
            digipow = digipow / 10;
        }
        return digits;
    };
    return NumberOperator;
}());
module.exports = NumberOperator;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);}
