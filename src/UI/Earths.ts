class Earths {
    nEarth: g.Sprite;
    dEarth: g.Sprite;
    lastruin: number;

    constructor(scene: g.Scene) {
        this.nEarth = new g.Sprite({ scene: scene, src: scene.assets["earth_normal"], width: 64, height: 64 });
        this.dEarth = new g.Sprite({ scene: scene, src: scene.assets["earth_danger"], width: 64, height: 64 });
        this.SetPosition(220, 4);
        this.SetAlpha(1, 0);
        scene.append(this.dEarth);
        scene.append(this.nEarth);
        this.lastruin = 0;
    }

    // 更新
    Update(): void {
        if (this.lastruin === g.game.vars["ruindegree"]) return;
        const diviedruin: number = g.game.vars["ruindegree"] / 100;
        this.SetAlpha(1 - diviedruin, diviedruin);
        this.lastruin = g.game.vars["ruindegree"];
    }

    // 透明度の設定
    SetAlpha(normal: number, danger: number) {
        this.nEarth.opacity = normal;
        this.dEarth.opacity = danger;
        this.nEarth.modified();
        this.dEarth.modified();
    }

    // ポジションの設定
    SetPosition(x: number, y: number) {
        this.nEarth.moveTo(x, y);
        this.dEarth.moveTo(x, y);
        this.nEarth.modified();
        this.dEarth.modified();
    }
}
export = Earths;
