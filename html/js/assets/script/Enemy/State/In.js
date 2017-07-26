window.gLocalAssetContainer["In"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var ObjectMove = require("../../Utility/ObjectMove");
var In = (function () {
    function In(y, nextStateID) {
        this.nextStateID = nextStateID === undefined ? "" : nextStateID;
        this.targetPositionY = y;
    }
    // 初期化の前に実行される関数
    In.prototype.Awake = function (ss) {
        this.ss = ss;
        this.move = new ObjectMove(ss.ACTOR);
        this.nextStateID = this.nextStateID === "" ? "Dead" : this.nextStateID;
    };
    // 初期化
    In.prototype.Initialize = function () {
        if (this.midstream) {
            this.move.SetPause(false);
        }
        else {
            this.move.ToMove(this.ss.ACTOR.x, this.targetPositionY, 1000);
        }
        this.ss.SSPlay("in", 1, true);
    };
    // 更新
    In.prototype.Update = function () { };
    // このステートの終了処理
    In.prototype.End = function () {
        this.midstream = this.move.IsPlaying();
        this.move.SetPause(this.move.IsPlaying());
    };
    // ステートが終了してるかどうか
    In.prototype.StateEnd = function () {
        return !this.move.IsPlaying();
    };
    // 次のステートのID
    In.prototype.NextStateID = function () {
        return this.nextStateID;
    };
    // 死亡処理
    In.prototype.DeadEnd = function () {
        this.midstream = false;
        this.move.Remove();
    };
    return In;
}());
module.exports = In;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}