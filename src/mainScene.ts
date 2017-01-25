import title = require("./Scenes/Title");
import LoadingScene = require("./ShockingMoleLoadingScene");
import SoundManager = require("./SoundManager");

g.game.loadingScene = new LoadingScene({game : g.game});
export = function() {
  const scene = new g.Scene({game : g.game});
  g.game.vars["SoundManager"] = new SoundManager();

  scene.loaded.handle(function(){
     scene.gotoScene(title());
  });

  return scene;
};
