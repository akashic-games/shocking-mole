window.gLocalAssetContainer["GameTimeUI"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var NumberUI = require("./NumberUI");
var GameTimeUI = (function () {
    function GameTimeUI(scene) {
        this.timeUI = new NumberUI(scene, false);
        this.timeUI.SetNumber(0, 560, -13);
        this.timeUI.Scale(0.7);
    }
    // ゲーム時間を表示
    GameTimeUI.prototype.SetTimeNumber = function (gametime) {
        var seconds = Math.floor(gametime / g.game.fps);
        this.timeUI.SetNumber(seconds);
    };
    return GameTimeUI;
}());
module.exports = GameTimeUI;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}