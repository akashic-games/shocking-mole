import EnemyState = require("./EnemyState");
import SSManager = require("../../SSManager");

class EnemyStateMachine {
    states: { [key: string]: EnemyState; } = {};
    currentStateID: string;
    lastStateID: string;

    // 初期化の前に実行される関数
    Awake(ss: SSManager): void {
        for (const s in this.states) {
            this.states[s].Awake(ss);
        }
    }

    // 初期化
    Initialize(initStateID: string) {
        this.currentStateID = initStateID;
        this.lastStateID = this.currentStateID;
    }

    // ステートの追加
    Add(id: string, enemyState: EnemyState): void {
        this.states[id] = enemyState;
    }

    // 更新
    Update(): void {
        this.states[this.currentStateID].Update();
        this.StateEnd();
    }

    // ステートの終了
    StateEnd(): void {
        if (!this.states[this.currentStateID].StateEnd()) return;
        const name = this.NextName();
        this.DeadEnd(name);
        this.ChangeState(name);
    }

    // 次のステートの名前
    NextName(): string {
        let nextName: string = this.currentStateID !== "Damage" ? this.states[this.currentStateID].NextStateID() : this.lastStateID;
        nextName = this.states[this.currentStateID].nextStateID === "Dead" ? "Dead" : nextName;
        return nextName;
    }

    // ステートの変更
    ChangeState(changeName: string): void {
        this.states[this.currentStateID].End();
        this.lastStateID = this.currentStateID;
        this.currentStateID = changeName;
        this.states[this.currentStateID].Initialize();
    }

    // 現在のステートIDの取得
    GetCurrentStateID(): string {
        return this.currentStateID;
    }

    // 死亡で終了時
    DeadEnd(nextName: string): void {
        if (nextName !== "Dead") return;
        for (const s in this.states) {
            this.states[s].DeadEnd();
        }
    }
}

export = EnemyStateMachine;
