class SoundManager {
    scene: g.Scene;
    private noSound: boolean;

    constructor() {
        this.noSound = false;
    }

    // 初期化
    Initialize(scene: g.Scene) {
        this.scene = scene;
    }

    // サウンドの再生
    Play(audioName: string) {
        if (this.noSound) return;
        (<g.AudioAsset>this.scene.assets[audioName]).play();
    }

    // サウンドの停止
    Stop(audioName: string): void {
        if (this.noSound) return;
        (<g.AudioAsset>this.scene.assets[audioName]).stop();
    }
}

export = SoundManager;
