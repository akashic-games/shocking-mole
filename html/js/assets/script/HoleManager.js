window.gLocalAssetContainer["HoleManager"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var Vector2 = require("./Utility/Vector2");
var HoleManager = (function () {
    function HoleManager() {
        this.holesPositions = new Array(5);
        this.holesPositions[0] = new Vector2(212, 400);
        this.holesPositions[1] = new Vector2(457, 400);
        this.holesPositions[2] = new Vector2(72, 460);
        this.holesPositions[3] = new Vector2(340, 460);
        this.holesPositions[4] = new Vector2(568, 460);
        this.holes = new Array(5);
        for (var i = 0; i < 5; i++) {
            this.holes[i] = true;
        }
    }
    // 使える穴があるかどうか
    HoleManager.prototype.CanUseHole = function () {
        var can = false;
        for (var i = 0; i < this.holes.length; i++) {
            if (this.holes[i]) {
                can = true;
            }
        }
        return can;
    };
    // 使える穴をランダムで選ぶ
    HoleManager.prototype.GetRandomTrueHoleNum = function () {
        var canuse = false;
        var num = 0;
        while (!canuse) {
            num = this.GetRandomHole();
            canuse = this.holes[num];
        }
        return num;
    };
    // numに応じた穴の位置を返す
    HoleManager.prototype.GetHolePosition = function (num) {
        return this.holesPositions[num];
    };
    // ランダムな穴を取得
    HoleManager.prototype.GetRandomHole = function () {
        var random = g.game.random[0];
        return random.get(0, this.holes.length - 1);
    };
    return HoleManager;
}());
module.exports = HoleManager;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}