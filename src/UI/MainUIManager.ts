import GameTimeUI = require("./GameTimeUI");
import Earths = require("./Earths");
import GameTime = require("../GameTime");
import NumberUI = require("./NumberUI");
import ReportTextController = require("./ReportTextController");

// UIを管理するクラス
class MainUIManager {
    timeUI: GameTimeUI;               // ゲーム時間
    earths: Earths;                   // 地球の状態
    gametime: GameTime;               // ゲーム時間
    ruinUI: NumberUI;
    textcont: ReportTextController;

    Load(scene: g.Scene): void {
      const mask1 = new g.Sprite({scene: scene, src: scene.assets["uimask1"]});
      mask1.moveTo(378, 37);
      mask1.modified();
      scene.append(mask1);

      this.textcont = new ReportTextController();
      this.textcont.Initialize(scene);

      const uibg = new g.Sprite({ scene: scene, src: scene.assets["uibg1"] });
      scene.append(uibg);
      this.timeUI = new GameTimeUI(scene);
      this.earths = new Earths(scene);
      this.ruinUI = new NumberUI(scene, false);
    }

    // 初期化
    Init(gametime: GameTime): void {
        this.gametime = gametime;
        this.ruinUI.SetNumber(0, 150, 0);
    }

    // 更新
    Update(): void {
        this.timeUI.SetTimeNumber(this.gametime.time);
        this.ruinUI.SetNumber(g.game.vars["ruindegree"]);
        this.textcont.Update();
        this.earths.Update();
    }

    // 使うリソース
    GetAssetID(): string[] {
        return [].concat("earth_normal", "earth_danger", "numbers", "uibg1", "uimask1", "reporttexts");
    }
}

export = MainUIManager;
