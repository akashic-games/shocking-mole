window.gLocalAssetContainer["EnemyStateMachine"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var EnemyStateMachine = (function () {
    function EnemyStateMachine() {
        this.states = {};
    }
    // 初期化の前に実行される関数
    EnemyStateMachine.prototype.Awake = function (ss) {
        for (var s in this.states) {
            this.states[s].Awake(ss);
        }
    };
    // 初期化
    EnemyStateMachine.prototype.Initialize = function (initStateID) {
        this.currentStateID = initStateID;
        this.lastStateID = this.currentStateID;
    };
    // ステートの追加
    EnemyStateMachine.prototype.Add = function (id, enemyState) {
        this.states[id] = enemyState;
    };
    // 更新
    EnemyStateMachine.prototype.Update = function () {
        this.states[this.currentStateID].Update();
        this.StateEnd();
    };
    // ステートの終了
    EnemyStateMachine.prototype.StateEnd = function () {
        if (!this.states[this.currentStateID].StateEnd())
            return;
        var name = this.NextName();
        this.DeadEnd(name);
        this.ChangeState(name);
    };
    // 次のステートの名前
    EnemyStateMachine.prototype.NextName = function () {
        var nextName = this.currentStateID !== "Damage" ? this.states[this.currentStateID].NextStateID() : this.lastStateID;
        nextName = this.states[this.currentStateID].nextStateID === "Dead" ? "Dead" : nextName;
        return nextName;
    };
    // ステートの変更
    EnemyStateMachine.prototype.ChangeState = function (changeName) {
        this.states[this.currentStateID].End();
        this.lastStateID = this.currentStateID;
        this.currentStateID = changeName;
        this.states[this.currentStateID].Initialize();
    };
    // 現在のステートIDの取得
    EnemyStateMachine.prototype.GetCurrentStateID = function () {
        return this.currentStateID;
    };
    // 死亡で終了時
    EnemyStateMachine.prototype.DeadEnd = function (nextName) {
        if (nextName !== "Dead")
            return;
        for (var s in this.states) {
            this.states[s].DeadEnd();
        }
    };
    return EnemyStateMachine;
}());
module.exports = EnemyStateMachine;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}