"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EnemySuper = require("./EnemySuper");
var EnemyStateMachine = require("./State/EnemyStateMachine");
// State
var In = require("./State/In");
var Out = require("./State/Out");
var Damage = require("./State/Damage");
var None = require("./State/None");
var Dead = require("./State/Dead");
var Mole4 = (function (_super) {
    __extends(Mole4, _super);
    function Mole4() {
        return _super.call(this, 2, "4") || this;
    }
    // 初期化
    Mole4.prototype.Init = function (borncontroller) {
        this.stateMachine = new EnemyStateMachine();
        this.stateMachine.Add("None", new None());
        this.stateMachine.Add("Out", new Out("In"));
        this.stateMachine.Add("In", new In(g.game.height - this.enemy.ACTOR.height * 3));
        this.stateMachine.Add("Damage", new Damage(this.info));
        this.stateMachine.Add("Dead", new Dead(this.info, borncontroller));
        this.stateMachine.Awake(this.enemy);
        this.stateMachine.Initialize("None");
    };
    return Mole4;
}(EnemySuper));
module.exports = Mole4;
