window.gLocalAssetContainer["Damage"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var Damage = (function () {
    function Damage(info) {
        this.info = info;
    }
    // 初期化の前に実行される関数
    Damage.prototype.Awake = function (ss) {
        this.ss = ss;
    };
    // Scopeの設定
    Damage.prototype.SetScope = function () {
        var y = g.game.vars["scope"].ACTOR.height / 2;
        g.game.vars["scope"].SetPosition(this.ss.ACTOR.x, (this.ss.ACTOR.y / 2) + 100);
        g.game.vars["scope"].SSPlay("scope_shot", 1, false);
    };
    // 初期化
    Damage.prototype.Initialize = function () {
        this.info.Damage();
        this.SetScope();
        var startFrame = this.info.HP <= 0 ? 60 : 0;
        this.ss.SSPlay("damage", 1, false, startFrame);
        this.PlaySE(startFrame);
        this.nextStateID = this.info.IsDead() ? "Dead" : "NoDead";
    };
    // SEの再生
    Damage.prototype.PlaySE = function (startFrame) {
        g.game.vars["SoundManager"].Play("gun");
        g.game.vars["SoundManager"].Play("moledamageSE");
    };
    // 更新
    Damage.prototype.Update = function () { };
    // このステートの終了処理
    Damage.prototype.End = function () { };
    // ステートが終了してるかどうか
    Damage.prototype.StateEnd = function () {
        return this.ss.AnimeEnd();
    };
    // 次のステートのID
    Damage.prototype.NextStateID = function () {
        return this.nextStateID;
    };
    Damage.prototype.DeadEnd = function () { };
    return Damage;
}());
module.exports = Damage;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);}
