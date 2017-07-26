window.gLocalAssetContainer["SoundManager"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var SoundManager = (function () {
    function SoundManager() {
        this.noSound = false;
    }
    // 初期化
    SoundManager.prototype.Initialize = function (scene) {
        this.scene = scene;
    };
    // サウンドの再生
    SoundManager.prototype.Play = function (audioName) {
        if (this.noSound)
            return;
        this.scene.assets[audioName].play();
    };
    // サウンドの停止
    SoundManager.prototype.Stop = function (audioName) {
        if (this.noSound)
            return;
        this.scene.assets[audioName].stop();
    };
    return SoundManager;
}());
module.exports = SoundManager;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}