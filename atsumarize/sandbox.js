window.addEventListener("load", function() {

	start("exportHTML");

	function start(gamePath) {
		// TODO WebGL有効化
		// // webgl=1でRendererを問答無用でWebGLのみにする
		// if (getParameterByName("webgl")) {
		// 	conf.renderers = ["webgl"];
		// }

		// 本来であればgameIdはBIGINTとして扱われるので数値だけども、export html用なのでgamePathをそのまま使う
		var sandboxGameId = gamePath;
		var sandboxPlayer = { id: "9999", name: "sandbox-player" };
		var sandboxPlayId = "sandboxDummyPlayId";
		var storage = new gameStorage.GameStorage(window.localStorage, { gameId: sandboxGameId });

		var pdiBrowser = require("@akashic/pdi-browser");
		var gdr = require("@akashic/game-driver");

		var amflowClient = new gdr.MemoryAmflowClient({
			playId: sandboxPlayId,
			putStorageDataSyncFunc: storage.set.bind(storage),
			getStorageDataSyncFunc: function (readKeys) {
				var svs = storage.load(readKeys);
				// StorageValue[][]からStorageData[]に変換する
				// TODO: StorageValue[][]が返ってくる必然性はない。game-storage側の仕様を変えるべき。
				return readKeys.map(function (k, i) { return { readKey: k, values: svs[i] }; });
			}
		});

		var pf = new pdiBrowser.Platform({
			amflow: amflowClient,
			containerView: document.getElementById("container"),
			audioPlugins: [pdiBrowser.WebAudioPlugin],
			disablePreventDefault: true
		});

		// iOS Safari の音声用ワークアラウンド
		var audioTouchInitialized = false;
		document.addEventListener("touchstart", function () {
			if (audioTouchInitialized) return;
			audioTouchInitialized = true;
			var g = require("@akashic/akashic-engine");
			var p = new pdiBrowser.WebAudioPlugin();
			var dummyAudioSystem = new g.AudioSystem("dummy", { _audioSystemManager: new g.AudioSystemManager({}) });
			var ctx = p.createPlayer(dummyAudioSystem)._audioContext; // ダミーのコードでとにかくAudioContextを抜いてくる
			ctx.createBufferSource().start(0); // 本題
		});

		pf.loadGameConfiguration = function(url, callback) {
			try {
				var gameJsonText = window.gLocalAssetContainer["game.json"];
				gameJsonText = decodeURIComponent(gameJsonText);
				callback(null, JSON.parse(gameJsonText));
			} catch(error) {
				callback(error, null);
			}
		};

		pf._resourceFactory.createScriptAsset = function(id, assetPath) {
			return new LocalScriptAsset(id, assetPath);
		};

		pf._resourceFactory.createTextAsset = function(id, assetPath) {
			return new LocalTextAsset(id, assetPath);
		};

		driver = new gdr.GameDriver({
			platform: pf,
			player: sandboxPlayer,
			errorHandler: function (e) { console.log("ERRORHANDLER:", e); }
		});

		driver.gameCreatedTrigger.handle(function () {
			function fit() {
				pf.containerController.fitToSize({
					width: window.parent.innerWidth,
					height: window.parent.innerHeight
				}, true);
			}
			if (window.optionProps.magnify) {
				fit();
				window.addEventListener("orientationchange", function () {
					setTimeout(fit, 500);
				});
			}
		});

		driver.initialize({
			configurationUrl: "game.json",
			assetBase: "./",
			driverConfiguration: {
				playId: sandboxPlayId,
				playToken: "dummyToken",
				executionMode: gdr.ExecutionMode.Active
			},
			loopConfiguration: {
				loopMode: gdr.LoopMode.Realtime
			}
		}, function (e) {
			if (e) {
				throw e;
			}
			driver.startGame();
		});
// -----------ここからアツマール用の特殊コード--------------
window.sandboxDeveloperProps = {
	game: null,
	driver: driver,
	amflow: amflowClient,
	gameStorage: storage,
	gameId: sandboxGameId,
	path: gamePath,
	gdr: gdr,
	sandboxPlayer: sandboxPlayer
};
// -----------ここまで--------------
	}
});
