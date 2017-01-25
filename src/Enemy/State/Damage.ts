import EnemyState = require("./EnemyState");
import SSManager = require("../../SSManager");
import EnemyInformation = require("../EnemyInformation");

class Damage implements EnemyState {
    ss: SSManager;
    nextStateID: string;
    info: EnemyInformation;

    constructor(info: EnemyInformation) {
        this.info = info;
    }

    // 初期化の前に実行される関数
    Awake(ss: SSManager): void {
        this.ss = ss;
    }

    // Scopeの設定
    SetScope(): void {
        const y: number = g.game.vars["scope"].ACTOR.height / 2;
        g.game.vars["scope"].SetPosition(this.ss.ACTOR.x, (this.ss.ACTOR.y / 2) + 100);
        g.game.vars["scope"].SSPlay("scope_shot", 1, false);
    }

    // 初期化
    Initialize(): void {
        this.info.Damage();
        this.SetScope();
        const startFrame: number = this.info.HP <= 0 ? 60 : 0;
        this.ss.SSPlay("damage", 1, false, startFrame);
        this.PlaySE(startFrame);
        this.nextStateID = this.info.IsDead() ? "Dead" : "NoDead";
    }

    // SEの再生
    PlaySE(startFrame: number) {
        g.game.vars["SoundManager"].Play("gun");
        g.game.vars["SoundManager"].Play("moledamageSE");
    }

    // 更新
    Update(): void { }

    // このステートの終了処理
    End(): void { }

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

export = Damage;
