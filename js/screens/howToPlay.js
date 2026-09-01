import * as me from 'melonjs';
import game from '../game.js';

class HowToPlayScreen extends me.Stage {
    onResetEvent() {
        // background color and image
        me.game.world.backgroundColor.parseCSS(game.BACKGROUND_COLOR);
        let bgSprite = new me.Sprite(me.game.viewport.centerX, me.game.viewport.centerY, {image: "title_gameover_bg"});
        bgSprite.anchorPoint.set(0.5, 0.5);
        bgSprite.floating = true;
        me.game.world.addChild(bgSprite, -1);

        // how to play text
        let howToPlayX = me.game.viewport.width / 2;
        let howToPlayY = me.game.viewport.width / 8;

        let howToPlayText = new me.BitmapText(
            howToPlayX,
            howToPlayY,
            {
                font : game.FONT,
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_TITLE,
                text : "HOW TO PLAY"
            }
        );
        howToPlayText.tint.setColor(0, 255, 0);
        howToPlayText.floating = true;
        me.game.world.addChild(howToPlayText, 1);

        // move text
        let moveText = new me.BitmapText(
            howToPlayX,
            howToPlayY + 100,
            {
                font : game.FONT,
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_LABEL,
                text : "TAP WASD OR ARROWS TO MOVE"
            }
        );
        moveText.tint.setColor(0, 255, 0);
        moveText.floating = true;
        me.game.world.addChild(moveText, 2);

        me.audio.playTrack("title-theme");
    }

    onDestroyEvent() {
        me.audio.stopTrack("title-theme");
    }
}

export default HowToPlayScreen;