import EnemySuper = require("./EnemySuper");
import EnemyStateMachine = require("./State/EnemyStateMachine");
import EnemyBornController = require("./EnemyBornController");
// State
import In = require("./State/In");
import Out = require("./State/Out");
import Damage = require("./State/Damage");
import None = require("./State/None");
import Dead = require("./State/Dead");

class Mole4 extends EnemySuper {

    constructor() {
        super(2, "4");
    }

    // 初期化
    Init(borncontroller: EnemyBornController): void {
      this.stateMachine = new EnemyStateMachine();
      this.stateMachine.Add("None", new None());
      this.stateMachine.Add("Out", new Out("In"));
      this.stateMachine.Add("In", new In(g.game.height - this.enemy.ACTOR.height * 3));
      this.stateMachine.Add("Damage", new Damage(this.info));
      this.stateMachine.Add("Dead", new Dead(this.info, borncontroller));
      this.stateMachine.Awake(this.enemy);
      this.stateMachine.Initialize("None");
    }
}

export = Mole4;
