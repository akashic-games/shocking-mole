"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SSManager = require("./SSManager");
var ShockingMoleLoadingScene = (function (_super) {
    __extends(ShockingMoleLoadingScene, _super);
    function ShockingMoleLoadingScene(param) {
        _super.call(this, { game: param.game, assetIds: [].concat(["mogura"], "pj_mole1", ["an_1_in", "an_1_out", "an_1_damage", "an_1_dead", "an_1_wait_1", "an_1_wait_2", "an_1_wait_3", "an_1_wait"], ["bn_mole1"], ["sk_1_mogura"], ["pj_nowloading"], ["an_loading"], ["bn_nowloading"], ["sk_mogura"]) });
        this.loaded.handle(this, this._onLoaded);
        this.targetReset.handle(this, this._onLoaded);
        this.update.handle(this, this.Update);
    }
    // ロード
    ShockingMoleLoadingScene.prototype._onLoaded = function () {
        var bg = new g.FilledRect({ scene: this, width: g.game.width, height: g.game.height, cssColor: "black" });
        this.append(bg);
        this.loadingMole = new SSManager(["mogura"], "pj_mole1", ["an_1_in", "an_1_out", "an_1_damage", "an_1_dead", "an_1_wait_1", "an_1_wait_2", "an_1_wait_3", "an_1_wait"], ["bn_mole1"], ["sk_1_mogura"], ["mogura"], "mole1", 145, 185);
        this.loadingMole.Load(this, "wait_3", g.game.width / 2, (g.game.height / 2) + 50);
        this.loading = new SSManager(["mogura"], "pj_nowloading", ["an_loading"], ["bn_nowloading"], ["sk_mogura"], ["mogura"], "nowloading", 640, 360);
        this.loading.Load(this, "loading", g.game.width / 2, (g.game.height / 2));
        return true;
    };
    // 更新
    ShockingMoleLoadingScene.prototype.Update = function () {
        this.loadingMole.Update();
        this.loading.Update();
    };
    return ShockingMoleLoadingScene;
}(g.LoadingScene));
;
module.exports = ShockingMoleLoadingScene;
