window.gLocalAssetContainer["None"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var None = (function () {
    function None() {
    }
    // 初期化の前に実行される関数
    None.prototype.Awake = function (ss) { };
    // 初期化
    None.prototype.Initialize = function () { };
    // 更新
    None.prototype.Update = function () { };
    // このステートの終了処理
    None.prototype.End = function () { };
    // ステートが終了してるかどうか
    None.prototype.StateEnd = function () {
        return false;
    };
    // 次のステートのID
    None.prototype.NextStateID = function () {
        return this.nextStateID;
    };
    None.prototype.DeadEnd = function () { };
    return None;
}());
module.exports = None;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}