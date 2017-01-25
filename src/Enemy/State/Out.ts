import EnemyState = require("./EnemyState");
import ObjectMove = require("../../Utility/ObjectMove");
import SSManager = require("../../SSManager");

class Out implements EnemyState {
    move: ObjectMove;
    ss: SSManager;
    nextStateID: string;
    midstream: boolean;

    constructor(nextStateID?: string) {
        this.nextStateID = nextStateID === undefined ? "" : nextStateID;
    }

    // 初期化の前に実行される関数
    Awake(ss: SSManager) {
        this.ss = ss;
        this.move = new ObjectMove(ss.ACTOR);
        this.nextStateID = this.nextStateID === "" ? "Wait" : this.nextStateID;
        this.midstream = false;
    }

    // 初期化
    Initialize(): void {
        if (this.midstream) {
            this.move.SetPause(false);
        }
        else {
            this.move.Remove();
            this.move.ToMove(this.ss.ACTOR.x, this.ss.ACTOR.y - (this.ss.ACTOR.height), 500);
        }
        this.ss.SSPlay("out", 1, true);
    }

    // 更新
    Update(): void { }

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

    //死亡処理
    DeadEnd(): void {
        this.midstream = false;
        this.move.Remove();
    }
}
export = Out;
