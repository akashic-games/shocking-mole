window.gLocalAssetContainer["Dead"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var Dead = (function () {
    function Dead(info, borncontroller) {
        this.info = info;
        this.nextStateID = "None";
        this.borncontroller = borncontroller;
    }
    // 初期化の前に実行される関数
    Dead.prototype.Awake = function (ss) {
        this.ss = ss;
    };
    // 初期化
    Dead.prototype.Initialize = function () {
        if (this.info.HP <= 0) {
            g.game.vars["SoundManager"].Play("moledeadSE");
            this.ss.SSPlay("dead", 1, false, 0);
        }
        else {
            this.ss.SSPlay("dead", 1, false, 59);
        }
        this.info.Dead();
    };
    // 更新
    Dead.prototype.Update = function () { };
    // このステートの終了処理
    Dead.prototype.End = function () {
        this.borncontroller.Defeat(this.info.HOLENUM);
        this.ss.SetPosition(-200, 0);
    };
    // ステートが終了してるかどうか
    Dead.prototype.StateEnd = function () {
        return this.ss.AnimeEnd();
    };
    // 次のステートのID
    Dead.prototype.NextStateID = function () {
        return this.nextStateID;
    };
    Dead.prototype.DeadEnd = function () { };
    return Dead;
}());
module.exports = Dead;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}