"use strict";
var TimeLine = require("@akashic-extension/akashic-timeline");
var FadeStatus;
(function (FadeStatus) {
    FadeStatus[FadeStatus["FadeIn"] = 0] = "FadeIn";
    FadeStatus[FadeStatus["FadeOut"] = 1] = "FadeOut";
    FadeStatus[FadeStatus["FadeInEnd"] = 2] = "FadeInEnd";
    FadeStatus[FadeStatus["FadeOutEnd"] = 3] = "FadeOutEnd";
})(FadeStatus || (FadeStatus = {}));
var Fade = (function () {
    function Fade() {
    }
    // 初期化
    Fade.prototype.Init = function (scene) {
        this.canFadeOut = false;
        this.fadeTexture = new g.FilledRect({ scene: scene, cssColor: "black", width: 640, height: 360 });
        scene.append(this.fadeTexture);
        this.status = FadeStatus.FadeIn;
        this.CreateTween();
    };
    // Tweenの作成
    Fade.prototype.CreateTween = function () {
        var tl = new TimeLine.Timeline(g.game.scene());
        this.tween = tl.create(this.fadeTexture, { loop: false, modified: this.fadeTexture.modified, destroyed: this.fadeTexture.destroyed });
        this.tween.fadeOut(1000);
        this.tween.pause();
        this.tween.fadeIn(1000);
    };
    // 更新
    Fade.prototype.Update = function () {
        this.FadeIn();
        this.FadeOut();
    };
    // フェードインの処理
    Fade.prototype.FadeIn = function () {
        if (this.status !== FadeStatus.FadeIn || !this.tween.paused)
            return;
        if (!this.canFadeOut)
            return;
        this.status = FadeStatus.FadeOut;
        this.tween.paused = false;
    };
    // フェードアウトの処理
    Fade.prototype.FadeOut = function () {
        if (this.status !== FadeStatus.FadeOut)
            return;
        this.status = this.fadeTexture.opacity >= 1 ? FadeStatus.FadeOutEnd : this.status;
    };
    // フェードアウト
    Fade.prototype.StartFadeOut = function () {
        this.canFadeOut = true;
    };
    // フェードインが終わったかどうか
    Fade.prototype.FadeInEnd = function () {
        return this.tween.paused;
    };
    // フェードアウトが終わったかどうか
    Fade.prototype.FadeOutEnd = function () {
        return (this.status === FadeStatus.FadeOutEnd);
    };
    // 再度初期化できる状態にする
    Fade.prototype.Uninit = function () {
        this.fadeTexture.remove();
    };
    // フェードステータスをInに変更
    Fade.prototype.ChangeToIn = function () {
        this.status = FadeStatus.FadeIn;
    };
    return Fade;
}());
module.exports = Fade;
