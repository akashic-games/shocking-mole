window.gLocalAssetContainer["SSManager"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var asa = require("@akashic-extension/akashic-animation");
var SSManager = (function () {
    function SSManager(TEXNAME, PJNAME, ANNAMES, BNNAMES, SKNAMES, SKINNAMES, BONESETNAME, WIDTH, HEIGHT) {
        this.TEXNAME = TEXNAME;
        this.PJNAME = PJNAME;
        this.ANNAMES = ANNAMES;
        this.BNNAMES = BNNAMES;
        this.SKNAMES = SKNAMES;
        this.SKINNAMES = SKINNAMES;
        this.BONESETNAME = BONESETNAME;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
    }
    // SpriteStudioのオブジェクトロード
    SSManager.prototype.Load = function (scene, initAnimationName, posX, posY, loop) {
        if (posX === void 0) { posX = 0; }
        if (posY === void 0) { posY = 0; }
        if (loop === void 0) { loop = true; }
        this.ResourceSetting(scene);
        this.CreateActor(scene, initAnimationName, posX, posY, loop);
    };
    // sspjのロード
    SSManager.prototype.ResourceSetting = function (scene) {
        this.RES = new asa.Resource();
        this.RES.loadProject(this.PJNAME, scene.assets);
    };
    // SpriteStudioアニメーションのオブジェクト生成
    SSManager.prototype.CreateActor = function (scene, initAnimationName, posX, posY, loop) {
        if (posX === void 0) { posX = 0; }
        if (posY === void 0) { posY = 0; }
        if (loop === void 0) { loop = true; }
        var param = {
            scene: scene,
            resource: this.RES,
            animationName: "",
            skinNames: this.SKINNAMES,
            boneSetName: this.BONESETNAME,
            width: this.WIDTH,
            height: this.HEIGHT,
            playSpeed: 1
        };
        this.ACTOR = new asa.Actor(param);
        this.SSPlay(initAnimationName, 1, loop);
        this.lastAnimeName = initAnimationName;
        this.SetPosition(posX, posY);
        scene.append(this.ACTOR);
    };
    // 更新
    SSManager.prototype.Update = function () {
        this.ACTOR.calc();
        this.ACTOR.modified();
    };
    // 使うリソース
    SSManager.prototype.GetAssetID = function () {
        return [].concat(this.TEXNAME, this.PJNAME, this.ANNAMES, this.BNNAMES, this.SKNAMES);
    };
    // アニメーションの再生
    SSManager.prototype.SSPlay = function (name, speed, loop, startFrame) {
        if (speed === void 0) { speed = 1; }
        if (loop === void 0) { loop = true; }
        if (startFrame === void 0) { startFrame = 0; }
        this.lastAnimeName = this.currentAnimeName;
        this.currentAnimeName = name;
        this.ACTOR.play(name, startFrame, loop, speed);
    };
    // 一つ前のアニメーションを再生する
    SSManager.prototype.BackLastAnimePlay = function (loop, speed, startFrame) {
        if (loop === void 0) { loop = true; }
        if (speed === void 0) { speed = 1; }
        if (startFrame === void 0) { startFrame = 0; }
        this.currentAnimeName = this.lastAnimeName;
        this.ACTOR.play(this.lastAnimeName, startFrame, loop, speed);
        this.lastAnimeName = null;
    };
    // ポジションの設定
    SSManager.prototype.SetPosition = function (x, y) {
        this.ACTOR.moveTo(x, y);
        this.ACTOR.modified();
    };
    // アニメーションが終わったかどうか
    SSManager.prototype.AnimeEnd = function () {
        var aEnd;
        aEnd = (this.ACTOR.currentFrame === this.ACTOR.animation.frameCount - 1 && !this.ACTOR.loop);
        return aEnd;
    };
    // 現在再生されているアニメーション名の取得
    SSManager.prototype.GetCurrentAnimeName = function () {
        return this.currentAnimeName;
    };
    return SSManager;
}());
module.exports = SSManager;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);}
