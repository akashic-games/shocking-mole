import Super = require("./EnemySuper");
import EnemyController = require("./EnemyController");
import EnemyBornController = require("./EnemyBornController");

class EnemyManager {
    enemycontroller: EnemyController;
    borncontroller: EnemyBornController;

    // コンストラクタ
    constructor() {
        this.borncontroller = new EnemyBornController();
        this.enemycontroller = new EnemyController();
    }

    // 敵の生成
    EnemiesLoad(scene: g.Scene, loadTop: boolean): void {
        const ene: Super[] = loadTop ? this.enemycontroller.nTopEnemy : this.enemycontroller.nBotEnemy;
        this.enemycontroller.EnemyLoad(ene, scene);
    }

    // エフェクトのロード
    EffectLoad(scene: g.Scene): void {
        this.enemycontroller.EffectLoad(scene);
    }

    // 初期化
    Init(): void {
        this.enemycontroller.Init(this.borncontroller);
    }

    // 更新
    Update(): void {
        this.enemycontroller.Update();
        this.borncontroller.Update();
        this.borncontroller.EnemyBorn(this.enemycontroller.nTopEnemy, this.enemycontroller.nBotEnemy);
    }

    // 当たり判定
    Collision(x: number, y: number): void {
        this.enemycontroller.Collision(x, y);
    }

    // アセットの文字列を返す
    GetAssetID(): string[] {
        return [].concat(this.enemycontroller.GetAssetID());
    }
}
export = EnemyManager;
