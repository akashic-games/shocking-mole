window.gLocalAssetContainer["mainScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var title = require("./Scenes/Title");
var LoadingScene = require("./ShockingMoleLoadingScene");
var SoundManager = require("./SoundManager");
g.game.loadingScene = new LoadingScene({ game: g.game });
module.exports = function () {
    var scene = new g.Scene({ game: g.game });
    g.game.vars["SoundManager"] = new SoundManager();
    scene.loaded.handle(function () {
        scene.gotoScene(title());
    });
    return scene;
};

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);}
