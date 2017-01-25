import asa = require("@akashic-extension/akashic-animation");

class SSManager {
    RES: asa.Resource;
    ACTOR: asa.Actor;
    lastAnimeName: string;
    currentAnimeName: string;

    constructor(private TEXNAME: string[], private PJNAME: string, private ANNAMES: string[], private BNNAMES: string[], private SKNAMES: string[], private SKINNAMES: string[], private BONESETNAME: string, private WIDTH: number, private HEIGHT: number) { }

    // SpriteStudioのオブジェクトロード
    public Load(scene: g.Scene, initAnimationName: string, posX: number = 0, posY: number = 0, loop: boolean = true): void {
        this.ResourceSetting(scene);
        this.CreateActor(scene, initAnimationName, posX, posY, loop);
    }

    // sspjのロード
    private ResourceSetting(scene: g.Scene): void {
        this.RES = new asa.Resource();
        this.RES.loadProject(this.PJNAME, scene.assets);
    }

    // SpriteStudioアニメーションのオブジェクト生成
    private CreateActor(scene: g.Scene, initAnimationName: string, posX: number = 0, posY: number = 0, loop: boolean = true): void {
        const param = {
            scene: scene,
            resource: this.RES,
            animationName: "",
            skinNames: this.SKINNAMES,
            boneSetName: this.BONESETNAME,
            width: this.WIDTH,
            height: this.HEIGHT,
            playSpeed: 1
        };
        this.ACTOR = new asa.Actor(param);
        this.SSPlay(initAnimationName, 1, loop);
        this.lastAnimeName = initAnimationName;
        this.SetPosition(posX, posY);
        scene.append(this.ACTOR);
    }

    // 更新
    public Update(): void {
        this.ACTOR.calc();
        this.ACTOR.modified();
    }

    // 使うリソース
    public GetAssetID(): string[] {
        return [].concat(this.TEXNAME, this.PJNAME, this.ANNAMES, this.BNNAMES, this.SKNAMES);
    }

    // アニメーションの再生
    public SSPlay(name: string, speed = 1, loop = true, startFrame = 0): void {
        this.lastAnimeName = this.currentAnimeName;
        this.currentAnimeName = name;
        this.ACTOR.play(name, startFrame, loop, speed);
    }

    // 一つ前のアニメーションを再生する
    public BackLastAnimePlay(loop = true, speed = 1, startFrame = 0): void {
        this.currentAnimeName = this.lastAnimeName;
        this.ACTOR.play(this.lastAnimeName, startFrame, loop, speed);
        this.lastAnimeName = null;
    }

    // ポジションの設定
    public SetPosition(x: number, y: number): void {
        this.ACTOR.moveTo(x, y);
        this.ACTOR.modified();
    }

    // アニメーションが終わったかどうか
    public AnimeEnd(): boolean {
        let aEnd: boolean;
        aEnd = (this.ACTOR.currentFrame === this.ACTOR.animation.frameCount - 1 && !this.ACTOR.loop);
        return aEnd;
    }

    // 現在再生されているアニメーション名の取得
    public GetCurrentAnimeName(): string {
      return this.currentAnimeName;
    }
}
export = SSManager;
