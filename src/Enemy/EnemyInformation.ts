
class EnemyInformation {
    HP: number;
    SCORE: number;
    HOLENUM: number;
    STARTHP: number;
    RUINDEGREE: number;

    constructor(HP: number) {
        this.HP = HP;
        this.STARTHP = HP;
        this.SCORE = 100 * HP;
        this.RUINDEGREE = HP ^ 2;
    }

    // やられたかどうか
    IsDead(): boolean {
        let can: boolean = false;
        return can = this.HP <= 0 ? true : false;
    }

    // ダメージ
    Damage(): void {
        this.HP -= 1;
        g.game.vars["score"] += this.SCORE;
    }

    // 死亡処理
    Dead(): void {
      g.game.vars["ruindegree"] += this.HP * 10;
      g.game.vars["ruindegree"] = g.game.vars["ruindegree"] > 100 ? 100 : g.game.vars["ruindegree"];
      this.HP = this.STARTHP;
    }
}
export = EnemyInformation;
