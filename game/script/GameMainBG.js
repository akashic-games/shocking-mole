"use strict";
var SSManager = require("./SSManager");
var GameMainBG = (function () {
    function GameMainBG() {
        this.bg = new SSManager(["mogura"], "pj_gamemainbg", ["an_mainbg_2", "an_mainbg_in", "an_mainbg", "an_mainbg3_end", "an_mainbg3_out", "an_mainbg3"], ["bn_mainbg"], ["sk_mogura"], ["mogura"], "mainbg", 640, 360);
    }
    GameMainBG.prototype.Load = function (scene) {
        this.bg.Load(scene, "mainbg", g.game.width / 2, g.game.height / 2);
        this.bg.SSPlay("mainbg");
    };
    GameMainBG.prototype.Update = function () {
        this.bg.Update();
    };
    GameMainBG.prototype.StartBG3Anime = function () {
        if (g.game.vars["ruindegree"] < 50)
            return;
        if (this.bg.GetCurrentAnimeName() !== "mainbg_2")
            return;
        this.bg.SSPlay("mainbg3");
    };
    GameMainBG.prototype.StartBG3OutAnime = function () {
        if (this.bg.GetCurrentAnimeName() === "mainbg3_out")
            return;
        this.bg.SSPlay("mainbg3_out", 1, false);
    };
    GameMainBG.prototype.GetAssetID = function () {
        return this.bg.GetAssetID();
    };
    return GameMainBG;
}());
module.exports = GameMainBG;
