import ObjectMove = require("../Utility/ObjectMove");

class ReportTextController {
    texts: g.FrameSprite;   // 流すテキスト
    index: number;          // textsのインデックス
    move: ObjectMove;       // オブジェクトを移動させるTween

    constructor() {
        this.index = 0;
    }

    // 初期化
    Initialize(scene: g.Scene): void {
        this.texts = new g.FrameSprite({ scene: scene, src: <g.ImageAsset>scene.assets["reporttexts"], width: 400, height: 40 });
        this.texts.frames = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.texts.frameNumber = 0;
        this.texts.moveTo(g.game.width, 31);
        this.texts.modified();
        scene.append(this.texts);
        this.move = new ObjectMove(this.texts);
    }

    // 更新
    Update(): void {
        if (this.SameRuinDegree()) return;
        this.SetMove();
        this.MoveEnd();
    }

    // インデックスと地球破滅度/10が一緒かどうか
    private SameRuinDegree(): boolean {
        return this.index === g.game.vars["ruindegree"] / 10;
    }

    // 移動の設定
    private SetMove(): void {
        if (this.move.IsPlaying()) return;
        this.index = g.game.vars["ruindegree"] / 10;
        this.texts.frameNumber = this.index;
        this.move.ToMove(-100, 31, 2000);
    }

    // 移動の終了
    private MoveEnd(): void {
        if (this.move.IsPlaying()) return;
        this.index = this.index >= 8 ? 0 : this.index + 1;
        this.texts.moveTo(g.game.width, 31);
        this.texts.modified();
    }
}

export = ReportTextController;
