import NumberUI = require("./NumberUI");

class GameTimeUI {
    timeUI: NumberUI;

    constructor(scene: g.Scene) {
        this.timeUI = new NumberUI(scene, false);
        this.timeUI.SetNumber(0, 560, -13);
        this.timeUI.Scale(0.7);
    }

    // ゲーム時間を表示
    SetTimeNumber(gametime: number): void {
        const seconds: number = Math.floor(gametime / g.game.fps);
        this.timeUI.SetNumber(seconds);
    }
}

export = GameTimeUI;
