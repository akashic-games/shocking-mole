"use strict";
var Wait = (function () {
    function Wait() {
    }
    // 初期化の前に実行される関数
    Wait.prototype.Awake = function (ss) {
        this.ss = ss;
        this.nextStateID = "In";
        this.currentAnimeFrame = 0;
    };
    // 初期化
    Wait.prototype.Initialize = function () {
        if (this.midstream) {
            this.ss.SSPlay(this.currentAnimeName, 1, false, this.currentAnimeFrame);
        }
        else {
            var random = g.game.random[0];
            var waitNum = random.get(1, 3);
            this.currentAnimeName = "wait_" + waitNum.toString();
            this.ss.SSPlay(this.currentAnimeName, 2, false, this.currentAnimeFrame);
        }
    };
    // 更新
    Wait.prototype.Update = function () { };
    // このステートの終了処理
    Wait.prototype.End = function () {
        this.midstream = !this.ss.AnimeEnd() ? true : false;
        this.currentAnimeFrame = !this.ss.AnimeEnd() ? this.ss.ACTOR.currentFrame : 0;
    };
    // ステートが終了してるかどうか
    Wait.prototype.StateEnd = function () {
        return this.ss.AnimeEnd();
    };
    // 次のステートのID
    Wait.prototype.NextStateID = function () {
        return this.nextStateID;
    };
    // 死亡処理
    Wait.prototype.DeadEnd = function () {
        this.midstream = false;
    };
    return Wait;
}());
module.exports = Wait;
