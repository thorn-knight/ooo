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

        // label and image offset Y values
        let labelYOffset = 75;
        let imageYOffset = 50;

        // how to play text
        let howToPlayX = me.game.viewport.width / 2;
        let howToPlayY = me.game.viewport.height / 8;
        let currentY = howToPlayY;

        let howToPlayText = new me.BitmapText(
            howToPlayX,
            currentY,
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
        me.game.world.addChild(howToPlayText);

        currentY += labelYOffset;

        // move text
        let moveText = new me.BitmapText(
            howToPlayX,
            currentY,
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
        me.game.world.addChild(moveText);

        currentY += labelYOffset;

        // collect items
        let collectGemsText = new me.BitmapText(
            howToPlayX,
            currentY,
            {
                font : game.FONT,
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_LABEL,
                text : "COLLECT GEMS TO INCREASE SCORE"
            }
        );
        collectGemsText.tint.setColor(0, 255, 0);
        collectGemsText.floating = true;
        me.game.world.addChild(collectGemsText);

        currentY += imageYOffset;

        let centerX = me.game.viewport.width / 2;
        let centerXOffset = 32;

        let diamondImage = new me.Sprite(centerX - centerXOffset, currentY, {image: "diamondImage"});
        me.game.world.addChild(diamondImage);

        let emeraldImage = new me.Sprite((centerX - centerXOffset) - (centerXOffset * 2), currentY, {image: "emeraldImage"});
        me.game.world.addChild(emeraldImage);

        let rubyImage = new me.Sprite(centerX + centerXOffset, currentY, {image: "rubyImage"});
        me.game.world.addChild(rubyImage);

        let sapphireImage = new me.Sprite((centerX + centerXOffset) + (centerXOffset * 2), currentY, {image: "sapphireImage"});
        me.game.world.addChild(sapphireImage);

        currentY += labelYOffset;

        // avoid enemies
        let avoidEnemiesText = new me.BitmapText(
            howToPlayX,
            currentY,
            {
                font : game.FONT,
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_LABEL,
                text : "AVOID ENEMIES"
            }
        );
        avoidEnemiesText.tint.setColor(0, 255, 0);
        avoidEnemiesText.floating = true;
        me.game.world.addChild(avoidEnemiesText);

        currentY += imageYOffset + 20;

        let spawnlingImage = new me.Sprite(centerX, currentY, {image: "spawnlingImage"});
        me.game.world.addChild(spawnlingImage);

        let sentinelImage = new me.Sprite(centerX - (centerXOffset * 2), currentY, {image: "sentinelImage"});
        me.game.world.addChild(sentinelImage);

        let phantomImage = new me.Sprite(centerX + (centerXOffset * 2), currentY, {image: "phantomImage"});
        me.game.world.addChild(phantomImage);

        currentY += labelYOffset + 20;

        // use item
        let useItemText = new me.BitmapText(
            howToPlayX,
            currentY,
            {
                font : game.FONT,
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_LABEL,
                text : "SPACE TO USE EQUIPPED ITEM"
            }
        );
        useItemText.tint.setColor(0, 255, 0);
        useItemText.floating = true;
        me.game.world.addChild(useItemText);

        me.audio.playTrack("title-theme");
    }

    onDestroyEvent() {
        me.audio.stopTrack("title-theme");
    }
}

export default HowToPlayScreen;