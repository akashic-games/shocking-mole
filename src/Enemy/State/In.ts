import EnemyState = require("./EnemyState");
import ObjectMove = require("../../Utility/ObjectMove");
import SSManager = require("../../SSManager");

class In implements EnemyState {
    move: ObjectMove;
    ss: SSManager;
    nextStateID: string;
    midstream: boolean;
    targetPositionY: number;

    constructor(y: number, nextStateID?: string) {
        this.nextStateID = nextStateID === undefined ? "" : nextStateID;
        this.targetPositionY = y;
    }

    // 初期化の前に実行される関数
    Awake(ss: SSManager) {
        this.ss = ss;
        this.move = new ObjectMove(ss.ACTOR);
        this.nextStateID = this.nextStateID === "" ? "Dead" : this.nextStateID;
    }

    // 初期化
    Initialize(): void {
        if (this.midstream) {
            this.move.SetPause(false);
        }
        else {
            this.move.ToMove(this.ss.ACTOR.x, this.targetPositionY, 1000);
        }
        this.ss.SSPlay("in", 1, true);
    }

    // 更新
    Update(): void {}

    // このステートの終了処理
    End(): void {
        this.midstream = this.move.IsPlaying();
        this.move.SetPause(this.move.IsPlaying());
    }

    // ステートが終了してるかどうか
    StateEnd(): boolean {
        return !this.move.IsPlaying();
    }

    // 次のステートのID
    NextStateID(): string {
        return this.nextStateID;
    }

    // 死亡処理
    DeadEnd(): void {
        this.midstream = false;
        this.move.Remove();
    }
}

export = In;
