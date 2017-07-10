"use strict";
var TimeLine = require("@akashic-extension/akashic-timeline");
var ObjectMove = (function () {
    function ObjectMove(object) {
        this.object = object;
        this.tl = new TimeLine.Timeline(g.game.scene());
        this.tween = this.tl.create(this.object, { loop: false, modified: this.object.modified, destroyed: this.object.destroyed });
    }
    // 移動
    ObjectMove.prototype.ToMove = function (toX, toY, time, loop) {
        if (time === void 0) { time = 0; }
        if (loop === void 0) { loop = false; }
        this.tween = this.tl.create(this.object, { loop: loop, modified: this.object.modified, destroyed: this.object.destroyed });
        this.tween.moveX(toX, time);
        this.tween.moveY(toY, time);
    };
    // tweenの削除
    ObjectMove.prototype.Remove = function () {
        this.tl.remove(this.tween);
    };
    // tweenの停止
    ObjectMove.prototype.TweenPause = function () {
        this.tween.pause();
    };
    // 停止の設定
    ObjectMove.prototype.SetPause = function (pause) {
        this.tween.paused = pause;
    };
    // Tweenが再生中かどうか
    ObjectMove.prototype.IsPlaying = function () {
        return !this.tween.destroyed();
    };
    return ObjectMove;
}());
module.exports = ObjectMove;
