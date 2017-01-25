import TimeLine = require("@akashic-extension/akashic-timeline");

class ObjectMove {
    private tl: TimeLine.Timeline;  // Timeline
    private object: g.E;            // 動かすオブジェクト
    private tween: TimeLine.Tween;  // Tween

    constructor(object: g.E) {
        this.object = object;
        this.tl = new TimeLine.Timeline(g.game.scene());
        this.tween = this.tl.create(this.object, { loop: false, modified: this.object.modified, destroyed: this.object.destroyed });
    }

    // 移動
    ToMove(toX: number, toY: number, time: number = 0, loop: boolean = false): void {
        this.tween = this.tl.create(this.object, { loop: loop, modified: this.object.modified, destroyed: this.object.destroyed });
        this.tween.moveX(toX, time);
        this.tween.moveY(toY, time);
    }

    // tweenの削除
    Remove(): void {
        this.tl.remove(this.tween);
    }

    // tweenの停止
    TweenPause(): void {
        this.tween.pause();
    }

    // 停止の設定
    SetPause(pause: boolean) {
        this.tween.paused = pause;
    }

    // Tweenが再生中かどうか
    IsPlaying(): boolean {
        return !this.tween.destroyed();
    }
}
export = ObjectMove;
