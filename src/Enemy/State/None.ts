import EnemyState = require("./EnemyState");
import SSManager = require("../../SSManager");

class None implements EnemyState {
    ss: SSManager;
    nextStateID: string;

    // 初期化の前に実行される関数
    Awake(ss: SSManager): void { }

    // 初期化
    Initialize(): void { }

    // 更新
    Update(): void { }

    // このステートの終了処理
    End(): void { }

    // ステートが終了してるかどうか
    StateEnd(): boolean {
        return false;
    }

    // 次のステートのID
    NextStateID(): string {
        return this.nextStateID;
    }

    DeadEnd(): void { }
}

export = None;
