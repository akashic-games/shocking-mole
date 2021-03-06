"use strict";
var SSManager = require("../SSManager");
var main = require("../Scenes/GameMain");
var Fade = require("../Fade");
module.exports = function () {
    var tb = new SSManager(["mogura"], "pj_titlebg", ["an_title"], ["bn_title"], ["sk_mogura"], ["mogura"], "title", 640, 360);
    var fade = new Fade();
    var scene = new g.Scene({ game: g.game, assetIds: [].concat(tb.GetAssetID(), "titleBGM", "decisionSE") });
    var touch;
    var isFirstRun = true;
    scene.loaded.handle(function () {
        tb.Load(scene, "title");
        tb.SetPosition(320, 180);
        Init();
    });
    scene.update.handle(function () {
        fade.Update();
        tb.Update();
        GotoNextScene();
    });
    scene.pointUpCapture.handle(function () {
        Touch();
    });
    scene.stateChanged.handle(function (state) {
        if (isFirstRun)
            return;
        if (state !== g.SceneState.Active)
            return;
        // ゲームオーバーで戻ってきた
        Init();
    });
    // タッチ:ゲーム開始
    function Touch() {
        if (!touch)
            return;
        g.game.vars["SoundManager"].Play("decisionSE");
        touch = false;
        fade.StartFadeOut();
    }
    // 次のシーンへ
    function GotoNextScene() {
        if (!fade.FadeOutEnd())
            return;
        fade.Uninit();
        isFirstRun = false;
        g.game.pushScene(main());
        g.game.vars["SoundManager"].Stop("titleBGM");
    }
    // シーンの初期化
    function Init() {
        fade.Init(scene);
        g.game.vars["SoundManager"].Initialize(scene);
        g.game.vars["SoundManager"].Play("titleBGM");
        touch = true;
    }
    return scene;
};
