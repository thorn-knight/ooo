import * as me from 'melonjs';
import game from './../game.js';
import UIContainer from '../entities/HUD.js';
import { getGraphMatrixFromCurrentLevel } from './../entities/mapUtil.js';

class PlayScreen extends me.Stage {
    onResetEvent() {
        me.level.load("mars-map1", {onLoaded: this.onLevelLoaded});
    }

    onLevelLoaded() {
        getGraphMatrixFromCurrentLevel();
        me.game.world.backgroundColor.parseCSS("#313431");

        if (game.data.loadNextLevel) {
            game.data.ore = 0;
            game.data.level++;
        }
        game.data.loadNextLevel = false;

        game.enemyManager.startSpawning();
        game.collectibleManager.startSpawning();
        game.itemManager.startSpawning();

        game.hud = new UIContainer();
        me.game.world.addChild(game.hud, Infinity);

        // play bgm if not already playing
        /*
        let currentTrack = me.audio.getCurrentTrack();
        if (currentTrack !== "gameplay-theme")
            me.audio.playTrack("gameplay-theme");
        */
    }

    onDestroyEvent() {
        // stop bgm
        //me.audio.stopTrack("gameplay-theme");
        //me.game.world.reset();
    }
}

export default PlayScreen;