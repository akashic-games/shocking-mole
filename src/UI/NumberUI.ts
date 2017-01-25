import NumberOperator = require("../Utility/NumberOperator");

class NumberUI {
    numbers: g.FrameSprite[];
    math: NumberOperator;
    digit: number;
    lastdigit: number;
    leftpivot: boolean;

    constructor(scene: g.Scene, leftpivot: boolean = true) {
        this.leftpivot = leftpivot;
        this.math = new NumberOperator();
        this.digit = 1;
        this.lastdigit = 1;
        this.InitNumbers(scene);
    }

    // numbersの初期化
    private InitNumbers(scene: g.Scene): void {
        this.numbers = new Array(10);
        for (let i = 0; i < this.numbers.length; i++) {
            this.numbers[i] = new g.FrameSprite({ scene: scene, src: <g.ImageAsset>scene.assets["numbers"], width: 32, height: 64 });
            this.numbers[i].frames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            scene.append(this.numbers[i]);
        }
    }

    // num: 表示する数値
    SetNumber(num: number, x: number = 0, y: number = 0): void {
        this.lastdigit = this.digit;
        this.digit = this.math.GetDigitNum(num);
        const digits: number[] = this.math.GetDigits(num);
        for (let i = 0; i < this.numbers.length; i++) {
            if (i < this.digit) {
                this.numbers[i].frameNumber = digits[i];
                this.numbers[i].show();
            } else {
                this.numbers[i].hide();
            }
        }
        this.SetPosition(x, y);
    }

    // ポジションの設定
    SetPosition(x: number = 0, y: number = 0): void {
        // scale値を考慮した横幅を代入
        let width: number = this.CalcWidthScale(this.numbers[0].width - 5, this.numbers[0].scaleX);
        // 初期位置のindexが最初か最後から始まるか
        const index: number = this.leftpivot ? 0 : this.digit - 1;
        // xが何も受け取らなければ初期値はnumbers[index].x
        x = x === 0 ? this.numbers[index].x : x;
        // xが何も受け取らず、さらに次の桁のｘ値が0だったらlastdigit - 1をindexとした値を代入
        x = x === 0 ? this.numbers[this.lastdigit - 1].x : x;

        y = y === 0 ? this.numbers[0].y : y;
        for (let i = 0; i < this.digit; i++) {
            const absindex: number = Math.abs(index - i);
            this.numbers[absindex].x = this.leftpivot ? x + (width * i) : x - (width * i);
            this.numbers[absindex].y = y;
            this.numbers[absindex].modified();
        }
    }

    // 幅と大きさを乗算した値を返す
    private CalcWidthScale(width: number, scale: number): number {
        return width * scale;
    }

    // スケールの変更
    Scale(magnification: number): void {
        for (let i = 0; i < this.numbers.length; i++) {
            this.numbers[i].scale(magnification);
        }
        this.SetPosition();
    }

    // 透明度の変更
    Opacity(opacity: number): void {
        for (let i = 0; i < this.numbers.length; i++) {
            this.numbers[i].opacity = opacity;
        }
    }

    // 透明度の加算
    AddOpacity(addNum: number): void {
        if (this.numbers[0].opacity >= 1) return;
        for (let i = 0; i < this.numbers.length; i++) {
            this.numbers[i].opacity += addNum;
        }
    }
}
export = NumberUI;
