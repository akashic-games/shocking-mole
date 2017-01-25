import EnemyState = require("./EnemyState");
import SSManager = require("../../SSManager");
import EnemyBornController = require("../EnemyBornController");
import EnemyInformation = require("../EnemyInformation");

class Dead implements EnemyState {
    ss: SSManager;
    nextStateID: string;
    info: EnemyInformation;
    borncontroller: EnemyBornController;

    constructor(info: EnemyInformation, borncontroller: EnemyBornController) {
        this.info = info;
        this.nextStateID = "None";
        this.borncontroller = borncontroller;
    }

    // 初期化の前に実行される関数
    Awake(ss: SSManager): void {
        this.ss = ss;
    }

    // 初期化
    Initialize(): void {
        if (this.info.HP <= 0) {
          g.game.vars["SoundManager"].Play("moledeadSE");
            this.ss.SSPlay("dead", 1, false, 0);
        } else {
            this.ss.SSPlay("dead", 1, false, 59);
        }
        this.info.Dead();
    }

    // 更新
    Update(): void { }

    // このステートの終了処理
    End(): void {
        this.borncontroller.Defeat(this.info.HOLENUM);
        this.ss.SetPosition(-200, 0);
    }

    // ステートが終了してるかどうか
    StateEnd(): boolean {
        return this.ss.AnimeEnd();
    }

    // 次のステートのID
    NextStateID(): string {
        return this.nextStateID;
    }

    DeadEnd(): void { }
}

export = Dead;
