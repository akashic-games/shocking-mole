import SSManager = require("../../SSmanager");

interface EnemyState {
    ss: SSManager;
    nextStateID: string;

    Awake(ss: SSManager);
    Initialize(): void;
    Update(): void;
    End(): void;
    StateEnd(): boolean;
    DeadEnd(): void;
    NextStateID(): string;
}

export = EnemyState;
