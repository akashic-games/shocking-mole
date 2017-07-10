window.gLocalAssetContainer["MainUIManager"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var GameTimeUI = require("./GameTimeUI");
var Earths = require("./Earths");
var NumberUI = require("./NumberUI");
var ReportTextController = require("./ReportTextController");
// UIを管理するクラス
var MainUIManager = (function () {
    function MainUIManager() {
    }
    MainUIManager.prototype.Load = function (scene) {
        var mask1 = new g.Sprite({ scene: scene, src: scene.assets["uimask1"] });
        mask1.moveTo(378, 37);
        mask1.modified();
        scene.append(mask1);
        this.textcont = new ReportTextController();
        this.textcont.Initialize(scene);
        var uibg = new g.Sprite({ scene: scene, src: scene.assets["uibg1"] });
        scene.append(uibg);
        this.timeUI = new GameTimeUI(scene);
        this.earths = new Earths(scene);
        this.ruinUI = new NumberUI(scene, false);
    };
    // 初期化
    MainUIManager.prototype.Init = function (gametime) {
        this.gametime = gametime;
        this.ruinUI.SetNumber(0, 150, 0);
    };
    // 更新
    MainUIManager.prototype.Update = function () {
        this.timeUI.SetTimeNumber(this.gametime.time);
        this.ruinUI.SetNumber(g.game.vars["ruindegree"]);
        this.textcont.Update();
        this.earths.Update();
    };
    // 使うリソース
    MainUIManager.prototype.GetAssetID = function () {
        return [].concat("earth_normal", "earth_danger", "numbers", "uibg1", "uimask1", "reporttexts");
    };
    return MainUIManager;
}());
module.exports = MainUIManager;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);}
