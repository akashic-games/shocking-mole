import EnemyState = require("./EnemyState");
import SSManager = require("../../SSManager");

class Wait implements EnemyState {
    ss: SSManager;
    nextStateID: string;
    midstream: boolean;
    currentAnimeFrame: number;
    currentAnimeName: string;

    // 初期化の前に実行される関数
    Awake(ss: SSManager) {
        this.ss = ss;
        this.nextStateID = "In";
        this.currentAnimeFrame = 0;
    }

    // 初期化
    Initialize(): void {
        if (this.midstream) {
            this.ss.SSPlay(this.currentAnimeName, 1, false, this.currentAnimeFrame);
        }
        else {
            const random = g.game.random[0];
            const waitNum: number = random.get(1, 3);
            this.currentAnimeName = "wait_" + waitNum.toString();
            this.ss.SSPlay(this.currentAnimeName, 2, false, this.currentAnimeFrame);
        }
    }

    // 更新
    Update(): void { }

    // このステートの終了処理
    End(): void {
        this.midstream = !this.ss.AnimeEnd() ? true : false;
        this.currentAnimeFrame = !this.ss.AnimeEnd() ? this.ss.ACTOR.currentFrame : 0;
    }

    // ステートが終了してるかどうか
    StateEnd(): boolean {
        return this.ss.AnimeEnd();
    }

    // 次のステートのID
    NextStateID(): string {
        return this.nextStateID;
    }

    // 死亡処理
    DeadEnd(): void {
        this.midstream = false;
    }
}

export = Wait;
