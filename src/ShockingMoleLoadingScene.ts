import SSManager = require("./SSManager");

class ShockingMoleLoadingScene extends g.LoadingScene {
    private loadingMole: SSManager; // シーンに表示されるモグラ
    private loading: SSManager;     // シーンに表示されるNOWLOADING

    constructor(param: g.LoadingSceneParameterObject) {
        super({ game: param.game, assetIds: [].concat(["mogura"], "pj_mole1", ["an_1_in", "an_1_out", "an_1_damage", "an_1_dead", "an_1_wait_1", "an_1_wait_2", "an_1_wait_3", "an_1_wait"], ["bn_mole1"], ["sk_1_mogura"], ["pj_nowloading"], ["an_loading"], ["bn_nowloading"], ["sk_mogura"]) });
        this.targetReset.handle(this, this._onTargetReset);
        this.update.handle(this, this.Update);
    }

    // ロード
    _onTargetReset(): boolean {
        const bg = new g.FilledRect({ scene: this, width: g.game.width, height: g.game.height, cssColor: "black" });
        this.append(bg);

        this.loadingMole = new SSManager(["mogura"], "pj_mole1", ["an_1_in", "an_1_out", "an_1_damage", "an_1_dead", "an_1_wait_1", "an_1_wait_2", "an_1_wait_3", "an_1_wait"], ["bn_mole1"], ["sk_1_mogura"], ["mogura"], "mole1", 145, 185);
        this.loadingMole.Load(this, "wait_3", g.game.width / 2, (g.game.height / 2) + 50);

        this.loading = new SSManager(["mogura"], "pj_nowloading", ["an_loading"], ["bn_nowloading"], ["sk_mogura"], ["mogura"], "nowloading", 640, 360);
        this.loading.Load(this, "loading", g.game.width / 2, (g.game.height / 2));
        return true;
    }

    // 更新
    Update(): void {
        this.loadingMole.Update();
        this.loading.Update();
    }
};

export = ShockingMoleLoadingScene;
