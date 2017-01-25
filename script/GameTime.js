"use strict";
var GameTime = (function () {
    function GameTime(GameEndTimeSecond) {
        this.time = GameEndTimeSecond * g.game.fps;
        this.isTimeEnd = false;
    }
    // 更新
    GameTime.prototype.Update = function () {
        this.TimeElapsed();
    };
    // timeの変更
    GameTime.prototype.TimeElapsed = function () {
        this.time = this.time <= 0 ? 0 : this.time - 1;
        this.isTimeEnd = this.time === 0 ? true : false;
    };
    return GameTime;
}());
module.exports = GameTime;
