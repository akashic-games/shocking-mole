"use strict";
var EnemyController = require("./EnemyController");
var EnemyBornController = require("./EnemyBornController");
var EnemyManager = (function () {
    // コンストラクタ
    function EnemyManager() {
        this.borncontroller = new EnemyBornController();
        this.enemycontroller = new EnemyController();
    }
    // 敵の生成
    EnemyManager.prototype.EnemiesLoad = function (scene, loadTop) {
        var ene = loadTop ? this.enemycontroller.nTopEnemy : this.enemycontroller.nBotEnemy;
        this.enemycontroller.EnemyLoad(ene, scene);
    };
    // エフェクトのロード
    EnemyManager.prototype.EffectLoad = function (scene) {
        this.enemycontroller.EffectLoad(scene);
    };
    // 初期化
    EnemyManager.prototype.Init = function () {
        this.enemycontroller.Init(this.borncontroller);
    };
    // 更新
    EnemyManager.prototype.Update = function () {
        this.enemycontroller.Update();
        this.borncontroller.Update();
        this.borncontroller.EnemyBorn(this.enemycontroller.nTopEnemy, this.enemycontroller.nBotEnemy);
    };
    // 当たり判定
    EnemyManager.prototype.Collision = function (x, y) {
        this.enemycontroller.Collision(x, y);
    };
    // アセットの文字列を返す
    EnemyManager.prototype.GetAssetID = function () {
        return [].concat(this.enemycontroller.GetAssetID());
    };
    return EnemyManager;
}());
module.exports = EnemyManager;
