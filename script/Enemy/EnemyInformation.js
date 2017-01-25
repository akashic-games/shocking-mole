"use strict";
var EnemyInformation = (function () {
    function EnemyInformation(HP) {
        this.HP = HP;
        this.STARTHP = HP;
        this.SCORE = 100 * HP;
        this.RUINDEGREE = HP ^ 2;
    }
    // やられたかどうか
    EnemyInformation.prototype.IsDead = function () {
        var can = false;
        return can = this.HP <= 0 ? true : false;
    };
    // ダメージ
    EnemyInformation.prototype.Damage = function () {
        this.HP -= 1;
        g.game.vars["score"] += this.SCORE;
    };
    // 死亡処理
    EnemyInformation.prototype.Dead = function () {
        g.game.vars["ruindegree"] += this.HP * 10;
        g.game.vars["ruindegree"] = g.game.vars["ruindegree"] > 100 ? 100 : g.game.vars["ruindegree"];
        this.HP = this.STARTHP;
    };
    return EnemyInformation;
}());
module.exports = EnemyInformation;
