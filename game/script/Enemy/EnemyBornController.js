"use strict";
var HoleManager = require("../HoleManager");
var EnemyBornController = (function () {
    function EnemyBornController() {
        this.holeManager = new HoleManager();
        this.bornInterval = 0;
        this.wave = 0;
        this.defeat = 0;
    }
    // 更新
    EnemyBornController.prototype.Update = function () {
        this.Interval();
    };
    // 生成のインターバル
    EnemyBornController.prototype.Interval = function () {
        this.bornInterval = this.bornInterval <= 0 ? 0 : this.bornInterval - 1;
    };
    // 敵の生成
    EnemyBornController.prototype.EnemyBorn = function (topEnemy, botEnemy) {
        if (!this.CanBorn())
            return;
        var num = this.holeManager.GetRandomTrueHoleNum();
        var Enemy = num <= 1 ? topEnemy : botEnemy;
        this.holeManager.holes[num] = false;
        this.SetEnemy(this.NonUsingEnemy(Enemy), num);
        this.bornInterval = 30;
    };
    // 生成可能かどうか
    EnemyBornController.prototype.CanBorn = function () {
        if (this.bornInterval <= 0 && this.holeManager.CanUseHole())
            return true;
        return false;
    };
    // 敵を設定
    EnemyBornController.prototype.SetEnemy = function (enemy, num) {
        var posi = this.holeManager.holesPositions[num];
        enemy.SetOut(posi.x, posi.y);
        enemy.info.HOLENUM = num;
    };
    // 使用中でない敵の取得
    EnemyBornController.prototype.NonUsingEnemy = function (enemies) {
        var using = false;
        var num = 0;
        while (!using) {
            var random = g.game.random[0];
            num = random.get((this.wave * 10), (this.wave * 10) + 9);
            using = enemies[num].stateMachine.currentStateID === "None" ? true : false;
        }
        return enemies[num];
    };
    // 倒された時の処理
    EnemyBornController.prototype.Defeat = function (holeNum) {
        this.holeManager.holes[holeNum] = true;
        this.defeat += 1;
        this.wave += this.defeat % 3 === 0 ? 1 : 0;
        this.wave = this.wave >= 4 ? 4 : this.wave;
    };
    return EnemyBornController;
}());
module.exports = EnemyBornController;
