import NumberUI = require("../UI/NumberUI");

class ResultUI {
    texts: g.Sprite;          // リザルト結果のテキスト
    score: NumberUI;          // スコア
    rb_texts: g.FrameSprite;  // 一言テキスト

    // 初期化
    Initialize(scene: g.Scene): void {
        this.texts = new g.Sprite({ scene: scene, src: scene.assets["result_texts"] });
        this.texts.moveTo(155, 38);
        this.texts.opacity = 0;

        this.score = new NumberUI(scene);
        this.score.SetNumber(g.game.vars["score"], 320, 105);
        this.score.Opacity(0);

        this.rb_texts = new g.FrameSprite({ scene: scene, src: <g.ImageAsset>scene.assets["RBtexts"], width: 256, height: 64 });
        this.rb_texts.frames = [0, 1, 2, 3];
        this.rb_texts.frameNumber = this.FrameNumFromScore(g.game.vars["score"]);
        this.rb_texts.moveTo(260, 199);
        this.rb_texts.opacity = 0;
        this.rb_texts.modified();

        scene.append(this.texts);
        scene.append(this.rb_texts);
    }

    // アルファ値の加算
    AddOpacity(): void {
        this.texts.opacity += this.texts.opacity <= 1 ? 0.1 : 0;
        this.rb_texts.opacity += this.rb_texts.opacity <= 1 ? 0.1 : 0;
        this.score.AddOpacity(0.1);
    }

    // 使うリソース
    GetAssetID(): string[] {
        return [].concat("result_texts");
    }

    // スコアに応じた一言のfreamnumberを取得
    private FrameNumFromScore(score: number): number {
        let frameNumber: number = 0;
        if (score > 0 && score <= 6000) {
            frameNumber = 2;
        } else if (score > 6000 && score <= 15000) {
            frameNumber = 1;
        } else if (score > 15000) {
            frameNumber = 0;
        } else {
            frameNumber = 3;
        }
        return frameNumber;
    }
}
export = ResultUI;
