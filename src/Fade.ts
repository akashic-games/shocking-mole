import TimeLine = require("@akashic-extension/akashic-timeline");

enum FadeStatus {
    FadeIn,
    FadeOut,
    FadeInEnd,
    FadeOutEnd,
}

class Fade {
    fadeTexture: g.FilledRect;  // fadeで使うテクスチャ
    status: FadeStatus;         // フェードステータス
    tween: TimeLine.Tween;      // フェードのアルファ値を変えるためのTween
    canFadeOut: boolean;        // フェードアウトができるかどうか

    // 初期化
    Init(scene: g.Scene): void {
        this.canFadeOut = false;
        this.fadeTexture = new g.FilledRect({ scene: scene, cssColor: "black", width: 640, height: 360 });
        scene.append(this.fadeTexture);
        this.status = FadeStatus.FadeIn;
        this.CreateTween();
    }

    // Tweenの作成
    CreateTween(): void {
        const tl = new TimeLine.Timeline(g.game.scene());
        this.tween = tl.create(this.fadeTexture, { loop: false, modified: this.fadeTexture.modified, destroyed: this.fadeTexture.destroyed });
        this.tween.fadeOut(1000);
        this.tween.pause();
        this.tween.fadeIn(1000);
    }

    // 更新
    Update(): void {
        this.FadeIn();
        this.FadeOut();
    }

    // フェードインの処理
    FadeIn(): void {
        if (this.status !== FadeStatus.FadeIn || !this.tween.paused) return;
        if (!this.canFadeOut) return;
        this.status = FadeStatus.FadeOut;
        this.tween.paused = false;
    }

    // フェードアウトの処理
    FadeOut(): void {
        if (this.status !== FadeStatus.FadeOut) return;
        this.status = this.fadeTexture.opacity >= 1 ? FadeStatus.FadeOutEnd : this.status;
    }

    // フェードアウト
    StartFadeOut(): void {
        this.canFadeOut = true;
    }

    // フェードインが終わったかどうか
    FadeInEnd(): boolean {
        return this.tween.paused;
    }

    // フェードアウトが終わったかどうか
    FadeOutEnd(): boolean {
        return (this.status === FadeStatus.FadeOutEnd);
    }

    // 再度初期化できる状態にする
    Uninit(): void {
        this.fadeTexture.remove();
    }

    // フェードステータスをInに変更
    ChangeToIn(): void {
        this.status = FadeStatus.FadeIn;
    }
}

export = Fade;
