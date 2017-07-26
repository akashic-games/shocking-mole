window.gLocalAssetContainer["EnemySuper"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var SSManager = require("../SSManager");
var INFO = require("./EnemyInformation");
var EnemyStateMachine = require("./State/EnemyStateMachine");
// State
var In = require("./State/In");
var Out = require("./State/Out");
var Wait = require("./State/Wait");
var Damage = require("./State/Damage");
var None = require("./State/None");
var Dead = require("./State/Dead");
var EnemySuper = (function () {
    function EnemySuper(HP, numberName) {
        this.CraeteEnemy(numberName);
        this.info = new INFO(HP);
    }
    // 敵の生成
    EnemySuper.prototype.CraeteEnemy = function (numberName) {
        this.enemy = new SSManager(["mogura"], "pj_mole" + numberName, ["an_" + numberName + "_in",
            "an_" + numberName + "_out",
            "an_" + numberName + "_damage",
            "an_" + numberName + "_dead",
            "an_" + numberName + "_wait_1",
            "an_" + numberName + "_wait_2",
            "an_" + numberName + "_wait_3",
            "an_" + numberName + "_wait"], ["bn_mole" + numberName], ["sk_" + numberName + "_mogura"], ["mogura"], "mole" + numberName, 145, 185);
    };
    // 使うリソース
    EnemySuper.prototype.GetAssetID = function () {
        return [].concat(this.enemy.GetAssetID());
    };
    // ロード
    EnemySuper.prototype.Load = function (scene) {
        this.enemy.Load(scene, "out");
        this.enemy.SSPlay("out", 1, false);
    };
    // 初期化
    EnemySuper.prototype.Init = function (borncontroller) {
        this.stateMachine = new EnemyStateMachine();
        this.stateMachine.Add("None", new None());
        this.stateMachine.Add("Out", new Out());
        this.stateMachine.Add("Wait", new Wait());
        this.stateMachine.Add("In", new In(g.game.height + this.enemy.ACTOR.height * 2));
        this.stateMachine.Add("Damage", new Damage(this.info));
        this.stateMachine.Add("Dead", new Dead(this.info, borncontroller));
        this.stateMachine.Awake(this.enemy);
        this.stateMachine.Initialize("None");
    };
    // ポジションの設定
    EnemySuper.prototype.SetPosition = function (x, y, use) {
        if (use === void 0) { use = false; }
        this.enemy.SetPosition(x, y);
    };
    // アニメーションの再生
    EnemySuper.prototype.SSPlay = function (animeName, loop) {
        this.enemy.SSPlay(animeName, 1, loop);
    };
    // 更新
    EnemySuper.prototype.Update = function () {
        this.enemy.Update();
        this.stateMachine.Update();
    };
    // 当たり判定
    EnemySuper.prototype.Collision = function (x, y, hit) {
        if ((x <= this.enemy.ACTOR.x + (this.enemy.ACTOR.width - this.enemy.ACTOR.width / 2) && x >= (this.enemy.ACTOR.x - this.enemy.ACTOR.width / 2)) &&
            (y <= this.enemy.ACTOR.y + (this.enemy.ACTOR.height - this.enemy.ACTOR.height / 2) && y >= (this.enemy.ACTOR.y - this.enemy.ACTOR.height / 2))) {
            this.Damage(hit);
        }
    };
    // ダメージを受けた時
    EnemySuper.prototype.Damage = function (hit) {
        if (this.stateMachine.GetCurrentStateID() === "Damage" || this.stateMachine.GetCurrentStateID() === "Dead")
            return;
        this.HitEffectPlay(hit);
        this.stateMachine.ChangeState("Damage");
    };
    // hiteffectの再生
    EnemySuper.prototype.HitEffectPlay = function (hit) {
        hit.SetPosition(this.enemy.ACTOR.x, this.enemy.ACTOR.y - 100);
        hit.SSPlay("hit", 1, false);
    };
    // 穴から出るときの設定
    EnemySuper.prototype.SetOut = function (x, y) {
        this.SetPosition(x, y + (this.enemy.ACTOR.height / 2));
        this.stateMachine.ChangeState("Out");
    };
    return EnemySuper;
}());
module.exports = EnemySuper;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}