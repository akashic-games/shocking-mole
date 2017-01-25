import SSManager = require("./SSManager");

class Performance {
    private readygo: SSManager;   // readygoアニメーション
    private finish: SSManager;    // finishアニメーション
    private gameover: SSManager;  // gameoverアニメーション
    finishing: boolean;           // ゲームがfinishで終わったかどうか

    constructor() {
        this.readygo = new SSManager(["mogura"], "pj_readygo", ["an_readygo"], ["bn_readygo"], ["sk_mogura"], ["mogura"], "readygo", 640, 360);
        this.finish = new SSManager(["finish"], "pj_finish", ["an_finish"], ["bn_finish"], ["sk_finish"], ["finish"], "finish", 640, 360);
        this.gameover = new SSManager(["gameover"], "pj_gameover", ["an_over"], ["bn_gameover"], ["sk_gameover"], ["gameover"], "gameover", 640, 360);
        this.finishing = false;
    }

    // オブジェクトのロード
    Load(scene: g.Scene): void {
        this.readygo.Load(scene, "readygo", 1000, 0, false);
        this.finish.Load(scene, "finish", -1000, 0, false);
    }

    // gameoverアニメーションのロード
    GameOverLoad(scene: g.Scene): void {
        this.gameover.Load(scene, "over", 10000, 0);
    }

    // 更新
    Update(): void {
        this.readygo.Update();
        this.finish.Update();
        this.gameover.Update();
    }

    // リソース
    GetAssetID(): string[] {
        return [].concat(this.readygo.GetAssetID(), this.finish.GetAssetID(), this.gameover.GetAssetID());
    }

    // readygoアニメーションのスタート
    StartReadyAnimation(): void {
        this.readygo.SetPosition(g.game.width / 2, g.game.height / 2);
        this.readygo.SSPlay("readygo", 1, false);
    }

    // readygoアニメーションが終了したかどうか
    EndReadyAnimation(): boolean {
        return this.readygo.AnimeEnd();
    }

    // finishアニメーションのスタート
    StartFinishAnimation(): void {
        if (this.finishing) return;
        this.finish.SetPosition(g.game.width / 2, g.game.height / 2);
        this.finish.SSPlay("finish", 0.5, false);
        this.finishing = true;
    }

    // finishアニメーションが終了したかどうか
    EndFinishAnimation(): boolean {
        return this.finish.AnimeEnd();
    }

    // gameoverアニメーションのスタート
    StartOverAnimation(): void {
        this.gameover.ACTOR.moveTo(g.game.width / 2, g.game.height / 2);
        this.gameover.SSPlay("over", 0.5, false);
    }

    // gameoverアニメーションが終了したかどうか
    EndOverAnimation(): boolean {
        return this.gameover.AnimeEnd();
    }
}
export = Performance;
