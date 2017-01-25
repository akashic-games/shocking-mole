class NumberOperator {

    // 引数の値の桁数
    GetDigitNum(num: number): number {
        let digit: number = 0;
        let remainder: number = num;
        while (remainder >= 10) {
            digit += 1;
            remainder = remainder / 10;
        }

        return digit + 1;
    }

    // 引数の値の桁毎の数値
    GetDigits(num: number): number[] {
        let digits: number[] = new Array(this.GetDigitNum(num));
        let digipow: number = Math.pow(10, this.GetDigitNum(num) - 1);
        let remainder: number = num;
        for (let i = 0; i < digits.length; i++) {
            digits[i] = Math.floor(remainder / digipow);
            remainder = remainder % digipow;
            digipow = digipow / 10;
        }
        return digits;
    }
}
export = NumberOperator;
