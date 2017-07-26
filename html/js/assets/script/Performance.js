window.gLocalAssetContainer["Performance"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var SSManager = require("./SSManager");
var Performance = (function () {
    function Performance() {
        this.readygo = new SSManager(["mogura"], "pj_readygo", ["an_readygo"], ["bn_readygo"], ["sk_mogura"], ["mogura"], "readygo", 640, 360);
        this.finish = new SSManager(["finish"], "pj_finish", ["an_finish"], ["bn_finish"], ["sk_finish"], ["finish"], "finish", 640, 360);
        this.gameover = new SSManager(["gameover"], "pj_gameover", ["an_over"], ["bn_gameover"], ["sk_gameover"], ["gameover"], "gameover", 640, 360);
        this.finishing = false;
    }
    // オブジェクトのロード
    Performance.prototype.Load = function (scene) {
        this.readygo.Load(scene, "readygo", 1000, 0, false);
        this.finish.Load(scene, "finish", -1000, 0, false);
    };
    // gameoverアニメーションのロード
    Performance.prototype.GameOverLoad = function (scene) {
        this.gameover.Load(scene, "over", 10000, 0);
    };
    // 更新
    Performance.prototype.Update = function () {
        this.readygo.Update();
        this.finish.Update();
        this.gameover.Update();
    };
    // リソース
    Performance.prototype.GetAssetID = function () {
        return [].concat(this.readygo.GetAssetID(), this.finish.GetAssetID(), this.gameover.GetAssetID());
    };
    // readygoアニメーションのスタート
    Performance.prototype.StartReadyAnimation = function () {
        this.readygo.SetPosition(g.game.width / 2, g.game.height / 2);
        this.readygo.SSPlay("readygo", 1, false);
    };
    // readygoアニメーションが終了したかどうか
    Performance.prototype.EndReadyAnimation = function () {
        return this.readygo.AnimeEnd();
    };
    // finishアニメーションのスタート
    Performance.prototype.StartFinishAnimation = function () {
        if (this.finishing)
            return;
        this.finish.SetPosition(g.game.width / 2, g.game.height / 2);
        this.finish.SSPlay("finish", 0.5, false);
        this.finishing = true;
    };
    // finishアニメーションが終了したかどうか
    Performance.prototype.EndFinishAnimation = function () {
        return this.finish.AnimeEnd();
    };
    // gameoverアニメーションのスタート
    Performance.prototype.StartOverAnimation = function () {
        this.gameover.ACTOR.moveTo(g.game.width / 2, g.game.height / 2);
        this.gameover.SSPlay("over", 0.5, false);
    };
    // gameoverアニメーションが終了したかどうか
    Performance.prototype.EndOverAnimation = function () {
        return this.gameover.AnimeEnd();
    };
    return Performance;
}());
module.exports = Performance;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}