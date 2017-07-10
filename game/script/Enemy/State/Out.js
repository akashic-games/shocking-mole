"use strict";
var ObjectMove = require("../../Utility/ObjectMove");
var Out = (function () {
    function Out(nextStateID) {
        this.nextStateID = nextStateID === undefined ? "" : nextStateID;
    }
    // 初期化の前に実行される関数
    Out.prototype.Awake = function (ss) {
        this.ss = ss;
        this.move = new ObjectMove(ss.ACTOR);
        this.nextStateID = this.nextStateID === "" ? "Wait" : this.nextStateID;
        this.midstream = false;
    };
    // 初期化
    Out.prototype.Initialize = function () {
        if (this.midstream) {
            this.move.SetPause(false);
        }
        else {
            this.move.Remove();
            this.move.ToMove(this.ss.ACTOR.x, this.ss.ACTOR.y - (this.ss.ACTOR.height), 500);
        }
        this.ss.SSPlay("out", 1, true);
    };
    // 更新
    Out.prototype.Update = function () { };
    // このステートの終了処理
    Out.prototype.End = function () {
        this.midstream = this.move.IsPlaying();
        this.move.SetPause(this.move.IsPlaying());
    };
    // ステートが終了してるかどうか
    Out.prototype.StateEnd = function () {
        return !this.move.IsPlaying();
    };
    // 次のステートのID
    Out.prototype.NextStateID = function () {
        return this.nextStateID;
    };
    //死亡処理
    Out.prototype.DeadEnd = function () {
        this.midstream = false;
        this.move.Remove();
    };
    return Out;
}());
module.exports = Out;
