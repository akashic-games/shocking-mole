import SSManager = require("./SSManager");

class GameMainBG {
    bg: SSManager;

    constructor() {
        this.bg = new SSManager(["mogura"], "pj_gamemainbg", ["an_mainbg_2", "an_mainbg_in", "an_mainbg", "an_mainbg3_end", "an_mainbg3_out", "an_mainbg3"], ["bn_mainbg"], ["sk_mogura"], ["mogura"], "mainbg", 640, 360);
    }

    Load(scene: g.Scene): void {
        this.bg.Load(scene, "mainbg", g.game.width / 2, g.game.height / 2);
        this.bg.SSPlay("mainbg");
    }

    Update(): void {
        this.bg.Update();
    }

    StartBG3Anime(): void {
        if (g.game.vars["ruindegree"] < 50) return;
        if (this.bg.GetCurrentAnimeName() !== "mainbg_2") return;
        this.bg.SSPlay("mainbg3");
    }

    StartBG3OutAnime(): void {
      if (this.bg.GetCurrentAnimeName() === "mainbg3_out") return;
      this.bg.SSPlay("mainbg3_out", 1, false);
    }

    GetAssetID(): string[] {
        return this.bg.GetAssetID();
    }
}

export = GameMainBG;
