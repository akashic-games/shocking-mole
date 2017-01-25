import Vector2 = require("./Utility/Vector2");

class HoleManager {
    holes: boolean[];
    holesPositions: Vector2[];

    constructor() {
        this.holesPositions = new Array(5);
        this.holesPositions[0] = new Vector2(212, 400);
        this.holesPositions[1] = new Vector2(457, 400);
        this.holesPositions[2] = new Vector2(72, 460);
        this.holesPositions[3] = new Vector2(340, 460);
        this.holesPositions[4] = new Vector2(568, 460);

        this.holes = new Array(5);
        for (let i: number = 0; i < 5; i++) {
            this.holes[i] = true;
        }
    }

    // 使える穴があるかどうか
    CanUseHole(): boolean {
        let can: boolean = false;
        for (let i = 0; i < this.holes.length; i++) {
            if (this.holes[i]) {
                can = true;
            }
        }
        return can;
    }

    // 使える穴をランダムで選ぶ
    GetRandomTrueHoleNum(): number {
        let canuse: boolean = false;
        let num: number = 0;
        while (!canuse) {
            num = this.GetRandomHole();
            canuse = this.holes[num];
        }
        return num;
    }

    // numに応じた穴の位置を返す
    GetHolePosition(num: number): Vector2 {
        return this.holesPositions[num];
    }

    // ランダムな穴を取得
    GetRandomHole(): number {
        const random = g.game.random[0];
        return random.get(0, this.holes.length - 1);
    }
}
export = HoleManager;
