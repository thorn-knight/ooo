import * as me from 'melonjs';
import game from './../game.js';

class GameOverScreen extends me.Stage {
    onResetEvent() {
        // background color and image
        me.game.world.backgroundColor.parseCSS("#313431");
        me.game.world.addChild(new me.Sprite(0, 0, {image: "title_gameover_bg"}));

        // game over text
        let gameOverX = me.game.world.width / 2;
        let gameOverY = me.game.world.height / 4;

        me.game.world.addChild(new me.BitmapText(
            gameOverX,
            gameOverY,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 2,
                text : "GAME OVER"
            }
        ));

        // score text
        me.game.world.addChild(new me.BitmapText(
            gameOverX,
            gameOverY + 100,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 2,
                text : "SCORE : " + game.data.score
            }
        ));

        // bgm
        me.audio.playTrack("gameover-theme");
    }

    onDestroyEvent() {
        me.audio.stopTrack("gameover-theme");
    }
}

export default GameOverScreen;