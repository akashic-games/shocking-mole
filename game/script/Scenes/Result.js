"use strict";
var SSManager = require("../SSManager");
var Fade = require("../Fade");
var ResultUI = require("../UI/ResultUI");
module.exports = function () {
    var bg = new SSManager(["mogura"], "pj_gamemainbg", ["an_mainbg", "an_mainbg_in", "an_mainbg_2", "an_mainbg3", "an_mainbg3_end", "an_mainbg3_out"], ["bn_mainbg"], ["sk_mogura"], ["mogura"], "mainbg", 640, 360);
    var tatehuda = new SSManager(["tatehuda"], "pj_tatehuda", ["an_wait"], ["bn_tatehuda"], ["sk_tatehuda"], ["tatehuda"], "tatehuda", 640, 360);
    var fade = new Fade();
    var resultUI = new ResultUI();
    var scene = new g.Scene({ game: g.game, assetIds: [].concat(bg.GetAssetID(), tatehuda.GetAssetID(), resultUI.GetAssetID(), "resultBGM", "decisionSE", "numbers", "RBtexts") });
    scene.loaded.handle(function () {
        bg.Load(scene, "mainbg", g.game.width / 2, g.game.height / 2);
        tatehuda.Load(scene, "wait", g.game.width / 2, g.game.height / 2, false);
        resultUI.Initialize(scene);
        fade.Init(scene);
        g.game.vars["SoundManager"].Initialize(scene);
        g.game.vars["SoundManager"].Play("resultBGM");
    });
    scene.stateChanged.handle(function () {
        if (scene.state === g.SceneState.Active && scene.game.external.atsumaru) {
            scene.game.external.atsumaru.comment.resetAndChangeScene("Result");
        }
    });
    scene.update.handle(function () {
        bg.Update();
        fade.Update();
        TatehudaUpdate();
        AddOpacity();
        GotoNextScene();
    });
    scene.pointUpCapture.handle(function () {
        fade.StartFadeOut();
        g.game.vars["SoundManager"].Play("decisionSE");
    });
    // 立て札のアニメーション更新
    function TatehudaUpdate() {
        if (!fade.FadeInEnd())
            return;
        tatehuda.Update();
    }
    // リザルトのUIの透明度を加算
    function AddOpacity() {
        if (!tatehuda.AnimeEnd())
            return;
        resultUI.AddOpacity();
    }
    // 次のシーンへ
    function GotoNextScene() {
        if (!fade.FadeOutEnd())
            return;
        g.game.popScene();
    }
    return scene;
};
