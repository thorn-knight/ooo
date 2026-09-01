import * as me from 'melonjs';
//import { DebugPanelPlugin } from 'debugPlugin';

import game from './game.js';

import resources from './resources.js';

import TitleScreen from './screens/title.js';
import PlayScreen from './screens/play.js';
import GameOverScreen from './screens/gameOver.js';

import PlayerEntity from './entities/player.js';
import GemEntity from './entities/gem.js';
import Ore from './entities/ore.js';
import GemSpawn from './entities/gemSpawn.js';
import ItemSpawn from './entities/itemSpawn.js';
import OreSpawn from './entities/oreSpawn.js';
import Mineshaft from './entities/mineshaft.js';
import Phantom from './entities/phantom.js';
import Spawnling from './entities/spawnling.js';
import Sentinel from './entities/sentinel.js';
import Bomb from './entities/bomb.js';
import HomingMissile from './entities/homingMissile.js';
import Teleport from './entities/teleport.js';
import SpeedBoost from './entities/speedBoost.js';
import Explosion from './entities/explosion.js';
import CollectibleManager from './entities/collectibleManager.js';
import EnemyManager from './entities/enemyManager.js';
import ItemManager from './entities/itemManager.js';
import UIContainer from './entities/HUD.js';

/**
 *
 * Initialize the application
 */
export default function onload() {

    // init the video
    if (!me.video.init(800, 600, {parent : "screen", scaleMethod : "flex",  renderer : me.video.WEBGL, preferWebGL1 : false, depthTest: "z-buffer", subPixel : false})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    //me.plugin.register(new DebugPanelPlugin,  "debugPanel");
    //me.utils.function.defer(me.plugin.register, this, new DebugPanelPlugin, "debugPanel");

    // initialize the "sound engine"
    me.audio.init("mp3,ogg");
  
    // allow cross-origin for image/texture loading
	me.loader.setOptions({ crossOrigin : "anonymous" });

    // set all ressources to be loaded
    me.loader.preload(resources, () => {

        // set the play and game over screens
        me.state.set(me.state.MENU, new TitleScreen());
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.GAMEOVER, new GameOverScreen());

        // set the fade transition effect
        me.state.transition("fade", "#FFFFFF", 250);

        // register our objects entity in the object pool
        me.pool.register("Player", PlayerEntity);
        me.pool.register("Gem", GemEntity);
        me.pool.register("Ore", Ore);
        me.pool.register("GemSpawn", GemSpawn);
        me.pool.register("ItemSpawn", ItemSpawn);
        me.pool.register("OreSpawn", OreSpawn);
        me.pool.register("Mineshaft", Mineshaft);
        me.pool.register("Phantom", Phantom);
        me.pool.register("Spawnling", Spawnling);
        me.pool.register("Sentinel", Sentinel);
        me.pool.register("Bomb", Bomb);
        me.pool.register("HomingMissile", HomingMissile);
        me.pool.register("Teleport", Teleport);
        me.pool.register("SpeedBoost", SpeedBoost);
        me.pool.register("Explosion", Explosion);

        // no gravity
        me.game.world.gravity.set(0, 0);

        // load textures
       game.player_texture = new me.TextureAtlas(
            me.loader.getJSON("playerTexture"),
            me.loader.getImage("playerTexture")
        );

        game.gems_texture = new me.TextureAtlas(
            me.loader.getJSON("gemsTexture"),
            me.loader.getImage("gemsTexture")
        );

        game.ore_texture = new me.TextureAtlas(
            me.loader.getJSON("oreTexture"),
            me.loader.getImage("oreTexture")
        );

        game.phantom_texture = new me.TextureAtlas(
            me.loader.getJSON("phantomTexture"),
            me.loader.getImage("phantomTexture")
        );

        game.spawnling_texture = new me.TextureAtlas(
            me.loader.getJSON("spawnlingTexture"),
            me.loader.getImage("spawnlingTexture") 
        );

        game.sentinel_texture = new me.TextureAtlas(
            me.loader.getJSON("sentinelTexture"),
            me.loader.getImage("sentinelTexture") 
        );

        game.bomb_texture = new me.TextureAtlas(
            me.loader.getJSON("bombTexture"),
            me.loader.getImage("bombTexture") 
        );

        game.homing_missile_texture = new me.TextureAtlas(
            me.loader.getJSON("homingMissileTexture"),
            me.loader.getImage("homingMissileTexture") 
        );

        game.teleport_texture = new me.TextureAtlas(
            me.loader.getJSON("teleportTexture"),
            me.loader.getImage("teleportTexture") 
        );

        game.speed_boost_texture = new me.TextureAtlas(
            me.loader.getJSON("speedBoostTexture"),
            me.loader.getImage("speedBoostTexture") 
        );

        game.explosion_texture = new me.TextureAtlas(
            me.loader.getJSON("explosionTexture"),
            me.loader.getImage("explosionTexture") 
        );

        // set game managers
        game.collectibleManager = new CollectibleManager();
        game.itemManager = new ItemManager();
        game.enemyManager = new EnemyManager();

        // add some keyboard shortcuts
        me.event.on(me.event.KEYDOWN, (action, keyCode /*, edge */) => {

            // change global volume setting
            if (keyCode === me.input.KEY.PLUS) {
                // increase volume
                me.audio.setVolume(me.audio.getVolume()+0.1);
            } else if (keyCode === me.input.KEY.MINUS) {
                // decrease volume
                me.audio.setVolume(me.audio.getVolume()-0.1);
            }

            // toggle fullscreen on/off
            
            if (keyCode === me.input.KEY.F) {
                if (!me.device.isFullscreen()) {
                    me.device.requestFullscreen();
                } else {
                    me.device.exitFullscreen();
                }
            }
            
        });

        // switch to PLAY state
        //me.state.change(me.state.PLAY);
        me.state.change(me.state.MENU);
    });
}
