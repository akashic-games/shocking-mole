import Super = require("./EnemySuper");
import Vector2 = require("../Utility/Vector2");
import HoleManager = require("../HoleManager");

class EnemyBornController {
    bornInterval: number;
    holeManager: HoleManager;
    wave: number;
    defeat: number;

    constructor() {
        this.holeManager = new HoleManager();
        this.bornInterval = 0;
        this.wave = 0;
        this.defeat = 0;
    }

    // 更新
    Update(): void {
        this.Interval();
    }

    // 生成のインターバル
    Interval(): void {
        this.bornInterval = this.bornInterval <= 0 ? 0 : this.bornInterval - 1;
    }

    // 敵の生成
    EnemyBorn(topEnemy: Super[], botEnemy: Super[]): void {
        if (!this.CanBorn()) return;
        const num: number = this.holeManager.GetRandomTrueHoleNum();
        const Enemy: Super[] = num <= 1 ? topEnemy : botEnemy;
        this.holeManager.holes[num] = false;
        this.SetEnemy(this.NonUsingEnemy(Enemy), num);
        this.bornInterval = 30;
    }

    // 生成可能かどうか
    CanBorn(): boolean {
        if (this.bornInterval <= 0 && this.holeManager.CanUseHole()) return true;
        return false;
    }

    // 敵を設定
    private SetEnemy(enemy: Super, num: number): void {
        const posi: Vector2 = this.holeManager.holesPositions[num];
        enemy.SetOut(posi.x, posi.y);
        enemy.info.HOLENUM = num;
    }

    // 使用中でない敵の取得
    private NonUsingEnemy(enemies: Super[]): Super {
        let using: boolean = false;
        let num: number = 0;
        while (!using) {
            const random = g.game.random[0];
            num = random.get((this.wave * 10), (this.wave * 10) + 9);
            using = enemies[num].stateMachine.currentStateID === "None" ? true : false;
        }
        return enemies[num];
    }

    // 倒された時の処理
    Defeat(holeNum: number): void {
        this.holeManager.holes[holeNum] = true;
        this.defeat += 1;
        this.wave += this.defeat % 3 === 0 ? 1 : 0;
        this.wave = this.wave >= 4 ? 4 : this.wave;
    }
}

export = EnemyBornController;
