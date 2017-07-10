"use strict";
var Super = require("./EnemySuper");
var Mole4 = require("./Mole4");
var SSManager = require("../SSManager");
var EnemyController = (function () {
    // コンストラクタ
    function EnemyController() {
        this.nTopEnemy = new Array(50);
        this.nBotEnemy = new Array(50);
        this.SetEnemy(this.nTopEnemy);
        this.SetEnemy(this.nBotEnemy);
        this.hitEffectSS = new SSManager(["mogura"], "pj_hit", ["an_hit"], ["bn_hit"], ["sk_mogura"], ["mogura"], "hit", 100, 100);
    }
    // 敵のロード
    EnemyController.prototype.EnemyLoad = function (enemies, scene) {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].Load(scene);
            enemies[i].SetPosition(-200, 0);
        }
    };
    // hitEffectSSのロード
    EnemyController.prototype.EffectLoad = function (scene) {
        this.hitEffectSS.Load(scene, "hit");
        this.hitEffectSS.SSPlay("hit", 1, false);
        this.hitEffectSS.SetPosition(-500, 0);
    };
    // 初期化
    EnemyController.prototype.Init = function (borncontroller) {
        this.EnemiesInit(this.nTopEnemy, borncontroller);
        this.EnemiesInit(this.nBotEnemy, borncontroller);
    };
    // 更新
    EnemyController.prototype.Update = function () {
        this.EnemiesUpdate(this.nTopEnemy);
        this.EnemiesUpdate(this.nBotEnemy);
        this.hitEffectSS.Update();
    };
    // アセットの文字列を返す
    EnemyController.prototype.GetAssetID = function () {
        return [].concat(this.nTopEnemy[0].GetAssetID(), this.nTopEnemy[10].GetAssetID(), this.nTopEnemy[20].GetAssetID(), this.nTopEnemy[30].GetAssetID(), this.nTopEnemy[40].GetAssetID(), this.hitEffectSS.GetAssetID());
    };
    // 敵を設定する
    EnemyController.prototype.SetEnemy = function (enemies) {
        for (var i = 0; i < 10; i++) {
            enemies[i] = new Super(1, "1");
            enemies[i + 10] = new Super(1, "5");
            enemies[i + 20] = new Super(2, "2");
            enemies[i + 30] = new Mole4();
            enemies[i + 40] = new Super(3, "3");
        }
    };
    // 当たり判定
    EnemyController.prototype.Collision = function (x, y) {
        this.EnemiesCollision(this.nTopEnemy, x, y);
        this.EnemiesCollision(this.nBotEnemy, x, y);
    };
    // 敵の当たり判定
    EnemyController.prototype.EnemiesCollision = function (enemies, x, y) {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].Collision(x, y, this.hitEffectSS);
        }
    };
    // 敵の初期化
    EnemyController.prototype.EnemiesInit = function (enemies, borncontroller) {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].Init(borncontroller);
        }
    };
    // 敵の更新
    EnemyController.prototype.EnemiesUpdate = function (enemies) {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].Update();
        }
    };
    return EnemyController;
}());
module.exports = EnemyController;
