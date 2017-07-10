"use strict";
var Earths = (function () {
    function Earths(scene) {
        this.nEarth = new g.Sprite({ scene: scene, src: scene.assets["earth_normal"], width: 64, height: 64 });
        this.dEarth = new g.Sprite({ scene: scene, src: scene.assets["earth_danger"], width: 64, height: 64 });
        this.SetPosition(220, 4);
        this.SetAlpha(1, 0);
        scene.append(this.dEarth);
        scene.append(this.nEarth);
        this.lastruin = 0;
    }
    // 更新
    Earths.prototype.Update = function () {
        if (this.lastruin === g.game.vars["ruindegree"])
            return;
        var diviedruin = g.game.vars["ruindegree"] / 100;
        this.SetAlpha(1 - diviedruin, diviedruin);
        this.lastruin = g.game.vars["ruindegree"];
    };
    // 透明度の設定
    Earths.prototype.SetAlpha = function (normal, danger) {
        this.nEarth.opacity = normal;
        this.dEarth.opacity = danger;
        this.nEarth.modified();
        this.dEarth.modified();
    };
    // ポジションの設定
    Earths.prototype.SetPosition = function (x, y) {
        this.nEarth.moveTo(x, y);
        this.dEarth.moveTo(x, y);
        this.nEarth.modified();
        this.dEarth.modified();
    };
    return Earths;
}());
module.exports = Earths;
