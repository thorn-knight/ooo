import * as me from 'melonjs';
import game from '../game.js';

class BackToTitleButton extends me.UITextButton {
    constructor(x, y) {
        super(x, y, {
            font : "PressStart2P",
            text : "BACK",
            fillStyle : '#000000',
            textAlign : "center",
            textBaseline : "middle",
            size : game.TEXT_SIZE_BUTTON,
            hoverOffColor: game.BUTTON_HOVER_OFF_COLOR,
            hoverOnColor: game.BUTTON_HOVER_ON_COLOR
        });
        this.floating = true;
    }

    onClick(event) {
        this.resetGameData();
        me.state.change(me.state.MENU);
    }

    resetGameData() {
        game.data.level = 1;
        game.data.score = 0;
        game.data.lives = 3;
        game.data.ore = 0;
        game.data.oreRequiredThisLevel = 0;
        game.data.loadNextLevel = false;
        game.collectibleManager.reset(true);
        game.enemyManager.reset(true);
        game.itemManager.reset(true);
    }
}

class GameOverScreen extends me.Stage {
    onResetEvent() {
        // background color and image
        me.game.world.backgroundColor.parseCSS(game.BACKGROUND_COLOR);
        let bgSprite = new me.Sprite(me.game.viewport.centerX, me.game.viewport.centerY, {image: "title_gameover_bg"});
        bgSprite.anchorPoint.set(0.5, 0.5);
        bgSprite.floating = true;
        me.game.world.addChild(bgSprite, -1);

        // game over text
        let gameOverX = me.game.viewport.width / 2;
        let gameOverY = me.game.viewport.width / 8;

        let gameOverText = new me.BitmapText(
            gameOverX,
            gameOverY,
            {
                font : game.FONT,
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_TITLE,
                text : "GAME OVER"
            }
        );
        gameOverText.tint.setColor(0, 255, 0);
        gameOverText.floating = true;
        me.game.world.addChild(gameOverText, 1);

        // score text
        let scoreText = new me.BitmapText(
            gameOverX,
            gameOverY + 100,
            {
                font : game.FONT,
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_LABEL,
                text : "SCORE : " + game.data.score
            }
        );
        scoreText.tint.setColor(0, 255, 0);
        scoreText.floating = true;
        me.game.world.addChild(scoreText, 2);

        // level text
        let levelText = new me.BitmapText(
            gameOverX,
            gameOverY + 200,
            {
                font : game.FONT,
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_LABEL,
                text : "LEVEL : " + game.data.level
            }
        );
        levelText.tint.setColor(0, 255, 0);
        levelText.floating = true;
        me.game.world.addChild(levelText, 3);

        // back button
        this.backButton = new BackToTitleButton(gameOverX, gameOverY + 300);
        this.backButton.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(this.backButton, 4);

        // dead player sprite
        let deadPlayerSprite = new me.Sprite(gameOverX, gameOverY + 500, {image: "playerDead"});
        deadPlayerSprite.floating = true;
        deadPlayerSprite.scale(2, 2);
        me.game.world.addChild(deadPlayerSprite);

        // bgm
        me.audio.playTrack("gameover-theme");
    }

    onDestroyEvent() {
        me.audio.stopTrack("gameover-theme");
    }
}

export default GameOverScreen;