import Super = require("./EnemySuper");
import Mole4 = require("./Mole4");
import SSManager = require("../SSManager");
import EnemyBornController = require("./EnemyBornController");
import HoleManager = require("../HoleManager");

class EnemyController {
    nTopEnemy: Super[];
    nBotEnemy: Super[];
    hitEffectSS: SSManager;

    // コンストラクタ
    constructor() {
        this.nTopEnemy = new Array(50);
        this.nBotEnemy = new Array(50);
        this.SetEnemy(this.nTopEnemy);
        this.SetEnemy(this.nBotEnemy);
        this.hitEffectSS = new SSManager(["mogura"], "pj_hit", ["an_hit"], ["bn_hit"], ["sk_mogura"], ["mogura"], "hit", 100, 100);
    }

    // 敵のロード
    EnemyLoad(enemies: Super[], scene: g.Scene): void {
        for (let i: number = 0; i < enemies.length; i++) {
            enemies[i].Load(scene);
            enemies[i].SetPosition(-200, 0);
        }
    }

    // hitEffectSSのロード
    EffectLoad(scene: g.Scene): void {
        this.hitEffectSS.Load(scene, "hit");
        this.hitEffectSS.SSPlay("hit", 1, false);
        this.hitEffectSS.SetPosition(-500, 0);
    }

    // 初期化
    Init(borncontroller: EnemyBornController): void {
        this.EnemiesInit(this.nTopEnemy, borncontroller);
        this.EnemiesInit(this.nBotEnemy, borncontroller);
    }

    // 更新
    Update(): void {
        this.EnemiesUpdate(this.nTopEnemy);
        this.EnemiesUpdate(this.nBotEnemy);
        this.hitEffectSS.Update();
    }

    // アセットの文字列を返す
    GetAssetID(): string[] {
        return [].concat(this.nTopEnemy[0].GetAssetID(),
            this.nTopEnemy[10].GetAssetID(),
            this.nTopEnemy[20].GetAssetID(),
            this.nTopEnemy[30].GetAssetID(),
            this.nTopEnemy[40].GetAssetID(),
            this.hitEffectSS.GetAssetID());
    }

    // 敵を設定する
    SetEnemy(enemies: Super[]): void {
        for (let i = 0; i < 10; i++) {
            enemies[i] = new Super(1, "1");
            enemies[i + 10] = new Super(1, "5");
            enemies[i + 20] = new Super(2, "2");
            enemies[i + 30] = new Mole4();
            enemies[i + 40] = new Super(3, "3");
        }
    }

    // 当たり判定
    Collision(x: number, y: number): void {
        this.EnemiesCollision(this.nTopEnemy, x, y);
        this.EnemiesCollision(this.nBotEnemy, x, y);
    }

    // 敵の当たり判定
    EnemiesCollision(enemies: Super[], x: number, y: number): void {
        for (let i: number = 0; i < enemies.length; i++) {
            enemies[i].Collision(x, y, this.hitEffectSS);
        }
    }

    // 敵の初期化
    EnemiesInit(enemies: Super[], borncontroller: EnemyBornController): void {
        for (let i: number = 0; i < enemies.length; i++) {
            enemies[i].Init(borncontroller);
        }
    }

    // 敵の更新
    EnemiesUpdate(enemies: Super[]): void {
        for (let i: number = 0; i < enemies.length; i++) {
            enemies[i].Update();
        }
    }
}

export = EnemyController;
