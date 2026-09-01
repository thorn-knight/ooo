import * as me from 'melonjs';
import game from './../game.js';

class BackToTitleButton extends me.UITextButton {
    constructor(x, y) {
        super(x, y, {
            font : "PressStart2P",
            text : "Back",
            fillStyle : '#000000',
            textAlign : "center",
            textBaseline : "middle",
            size : 1,
            borderWidth: 200,
            borderHeight: 50,
            hoverOffColor: '#00FF00',
            hoverOnColor: 'rgb(22, 152, 22)'
        });
        this.floating = false;
    }

    onClick(event) {
        me.state.change(me.state.MENU);
    }
}

class GameOverScreen extends me.Stage {
    onResetEvent() {
        // background color and image
        me.game.world.backgroundColor.parseCSS(game.BACKGROUND_COLOR);
        let bgSprite = new me.Sprite(me.game.viewport.centerX, me.game.viewport.centerY, {image: "title_gameover_bg"});
        bgSprite.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(bgSprite, -1);

        // game over text
        let gameOverX = me.game.viewport.width / 2;
        let gameOverY = me.game.viewport.width / 8;

        let gameOverText = new me.BitmapText(
            gameOverX,
            gameOverY,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 1.5,
                text : "GAME OVER"
            }
        );
        gameOverText.tint.setColor(0, 255, 0);
        me.game.world.addChild(gameOverText, 1);

        // score text
        let scoreText = new me.BitmapText(
            gameOverX,
            gameOverY + 100,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 1,
                text : "SCORE : " + game.data.score
            }
        );
        scoreText.tint.setColor(0, 255, 0);
        me.game.world.addChild(scoreText, 2);

        // level text
        let levelText = new me.BitmapText(
            gameOverX,
            gameOverY + 200,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 1,
                text : "LEVEL : " + game.data.level
            }
        );
        levelText.tint.setColor(0, 255, 0);
        me.game.world.addChild(levelText, 3);

        // back button
        this.backButton = new BackToTitleButton(gameOverX, gameOverY + 300);
        this.backButton.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(this.backButton, 4);

        // bgm
        me.audio.playTrack("gameover-theme");
    }

    onDestroyEvent() {
        me.audio.stopTrack("gameover-theme");
    }
}

export default GameOverScreen;