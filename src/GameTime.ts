class GameTime {
    time: number;       // ゲーム時間
    isTimeEnd: boolean; // 時間が終了したかどうか

    constructor(GameEndTimeSecond: number) {
        this.time = GameEndTimeSecond * g.game.fps;
        this.isTimeEnd = false;
    }

    // 更新
    Update(): void {
        this.TimeElapsed();
    }

    // timeの変更
    TimeElapsed(): void {
        this.time = this.time <= 0 ? 0 : this.time - 1;
        this.isTimeEnd = this.time === 0 ? true : false;
    }
}

export = GameTime;
