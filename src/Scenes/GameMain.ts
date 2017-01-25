import Fade = require("../Fade");
import SSManager = require("../SSManager");
import GameMainBG = require("../GameMainBG");
import Emane = require("../Enemy/EnemyManager");
import Performance = require("../Performance");
import GameTime = require("../GameTime");
import UIManager = require("../UI/MainUIManager");
import Result = require("./Result");

// ゲームメインの状態
enum MainStatus {
    StartReady,
    Ready,
    Main,
    Finish,
    GameOver,
    NextScene,
}

export = function() {
    const mainBG = new GameMainBG();
    const scope = new SSManager(["mogura"], "pj_Scope", ["an_scope_shot", "an_scope_wait"], ["bn_scope"], ["sk_mogura"], ["mogura"], "scope", 256, 256);
    const emane = new Emane();
    const performance = new Performance();
    const gametime = new GameTime(30);
    const uiManager = new UIManager();
    const fade = new Fade();
    const scene = new g.Scene({ game: g.game, assetIds: [].concat("mask1", "mask2", uiManager.GetAssetID(), emane.GetAssetID(), performance.GetAssetID(), "mainBGM", "gun", "moledamageSE", "moledeadSE", scope.GetAssetID(), mainBG.GetAssetID()) });
    let status: MainStatus;

    scene.loaded.handle(function() {
        ObjectsLoad();  // メインで使うオブジェクトのロード
        Initialize();   // メインで使うオブジェクトの初期化

        g.game.vars["scope"] = scope;   // スコープをどこでも参照できるよう登録
        g.game.vars["score"] = 0;       // スコアに0を登録しておく
        g.game.vars["ruindegree"] = 0;  // 地球滅亡度に0を登録しておく
        status = MainStatus.StartReady; // 最初はreadygoアニメーションから
    });

    scene.update.handle(function() {
        fade.Update();
        mainBG.Update();
        performance.Update();

        switch (status) {
            case MainStatus.StartReady:
                if (!fade.FadeInEnd()) return;
                performance.StartReadyAnimation();
                mainBG.bg.SSPlay("mainbg_in", 1, false);
                status = MainStatus.Ready;
                break;
            case MainStatus.Ready:
                ReadyUpdate();
                break;
            case MainStatus.Main:
                MainUpdate();
                CheckGameOver();
                break;
            case MainStatus.Finish:
                FinishUpdate();
                break;
            case MainStatus.GameOver:
                GameOver();
                break;
            case MainStatus.NextScene:
                NextSceneUpdate();
                break;
        }
    });

    scene.pointDownCapture.handle(function(o) {
        emane.Collision(o.point.x, o.point.y);
    });

    // オブジェクトのロード
    function ObjectsLoad() {
        // maskを生成
        const mask1 = new g.Sprite({ scene: scene, src: scene.assets["mask1"] });
        const mask2 = new g.Sprite({ scene: scene, src: scene.assets["mask2"] });

        mainBG.Load(scene);
        emane.EnemiesLoad(scene, true);
        scene.append(mask1);
        emane.EnemiesLoad(scene, false);
        scene.append(mask2);
        emane.EffectLoad(scene);
        scope.Load(scene, "scope_wait", -256, 0);
        uiManager.Load(scene);
        performance.Load(scene);
    }

    // 初期化
    function Initialize() {
        emane.Init();
        uiManager.Init(gametime);
        fade.Init(scene);
        performance.GameOverLoad(scene);
        g.game.vars["SoundManager"].Initialize(scene);
        g.game.vars["SoundManager"].Play("mainBGM");
    }

    // Readyステータスの更新
    function ReadyUpdate() {
        if (!performance.EndReadyAnimation()) return;
        status = MainStatus.Main;
        mainBG.bg.SSPlay("mainbg_2");
    }

    // MainUpdateステータスの更新
    function MainUpdate() {
        if (g.game.vars["ruindegree"] >= 100) return;
        emane.Update();
        scope.Update();
        gametime.Update();
        uiManager.Update();
        if (!gametime.isTimeEnd) return;
        performance.StartFinishAnimation();
        status = MainStatus.Finish;
    }

    // Finishステータスの更新
    function FinishUpdate() {
        if (!performance.EndFinishAnimation()) return;
        fade.StartFadeOut();
        status = MainStatus.NextScene;
    }

    // NexｔSceneステータスの更新
    function NextSceneUpdate() {
        if (performance.finishing) {
            if (!fade.FadeOutEnd()) return;
            scene.gotoScene(Result(), false);
        } else {
            if (!performance.EndOverAnimation()) return;
            g.game.popScene();
        }
        g.game.vars["SoundManager"].Stop("mainBGM");
    }

    // ゲームオーバーになってるか
    function CheckGameOver() {
        if (g.game.vars["ruindegree"] < 100) return;
        mainBG.StartBG3OutAnime();
        if (!mainBG.bg.AnimeEnd()) return;
        fade.StartFadeOut();
        status = MainStatus.GameOver;
    }

    // ゲームオーバーステータスの更新
    function GameOver() {
        if (!fade.FadeOutEnd()) return;
        performance.StartOverAnimation();
        status = MainStatus.NextScene;
    }

    return scene;
};
