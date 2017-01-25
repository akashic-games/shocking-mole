import SSManager = require("../SSManager");
import INFO = require("./EnemyInformation");
import EnemyStateMachine = require("./State/EnemyStateMachine");
import EnemyBornController = require("./EnemyBornController");
// State
import In = require("./State/In");
import Out = require("./State/Out");
import Wait = require("./State/Wait");
import Damage = require("./State/Damage");
import None = require("./State/None");
import Dead = require("./State/Dead");

class EnemySuper {
    info: INFO;
    enemy: SSManager;
    stateMachine: EnemyStateMachine;

    constructor(HP: number, numberName: string) {
        this.CraeteEnemy(numberName);
        this.info = new INFO(HP);
    }

    // 敵の生成
    CraeteEnemy(numberName: string) {
        this.enemy = new SSManager(["mogura"], "pj_mole" + numberName, ["an_" + numberName + "_in",
            "an_" + numberName + "_out",
            "an_" + numberName + "_damage",
            "an_" + numberName + "_dead",
            "an_" + numberName + "_wait_1",
            "an_" + numberName + "_wait_2",
            "an_" + numberName + "_wait_3",
            "an_" + numberName + "_wait"],
            ["bn_mole" + numberName],
            ["sk_" + numberName + "_mogura"],
            ["mogura"],
            "mole" + numberName, 145, 185);
    }

    // 使うリソース
    GetAssetID(): string[] {
        return [].concat(this.enemy.GetAssetID());
    }

    // ロード
    Load(scene: g.Scene): void {
        this.enemy.Load(scene, "out");
        this.enemy.SSPlay("out", 1, false);
    }

    // 初期化
    Init(borncontroller: EnemyBornController): void {
        this.stateMachine = new EnemyStateMachine();
        this.stateMachine.Add("None", new None());
        this.stateMachine.Add("Out", new Out());
        this.stateMachine.Add("Wait", new Wait());
        this.stateMachine.Add("In", new In(g.game.height + this.enemy.ACTOR.height * 2));
        this.stateMachine.Add("Damage", new Damage(this.info));
        this.stateMachine.Add("Dead", new Dead(this.info, borncontroller));
        this.stateMachine.Awake(this.enemy);
        this.stateMachine.Initialize("None");
    }

    // ポジションの設定
    SetPosition(x: number, y: number, use: boolean = false): void {
        this.enemy.SetPosition(x, y);
    }

    // アニメーションの再生
    SSPlay(animeName: string, loop: boolean): void {
        this.enemy.SSPlay(animeName, 1, loop);
    }

    // 更新
    Update(): void {
        this.enemy.Update();
        this.stateMachine.Update();
    }

    // 当たり判定
    Collision(x: number, y: number, hit: SSManager): void {
        if ((x <= this.enemy.ACTOR.x + (this.enemy.ACTOR.width - this.enemy.ACTOR.width / 2) && x >= (this.enemy.ACTOR.x - this.enemy.ACTOR.width / 2)) &&
            (y <= this.enemy.ACTOR.y + (this.enemy.ACTOR.height - this.enemy.ACTOR.height / 2) && y >= (this.enemy.ACTOR.y - this.enemy.ACTOR.height / 2))) {
            this.Damage(hit);
        }
    }

    // ダメージを受けた時
    Damage(hit: SSManager): void {
        if (this.stateMachine.GetCurrentStateID() === "Damage" || this.stateMachine.GetCurrentStateID() === "Dead") return;
        this.HitEffectPlay(hit);
        this.stateMachine.ChangeState("Damage");
    }

    // hiteffectの再生
    HitEffectPlay(hit: SSManager): void {
        hit.SetPosition(this.enemy.ACTOR.x, this.enemy.ACTOR.y - 100);
        hit.SSPlay("hit", 1, false);
    }

    // 穴から出るときの設定
    SetOut(x: number, y: number): void {
        this.SetPosition(x, y + (this.enemy.ACTOR.height / 2));
        this.stateMachine.ChangeState("Out");
    }
}

export = EnemySuper;
