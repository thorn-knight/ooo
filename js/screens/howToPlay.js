import * as me from 'melonjs';
import game from '../game.js';

class BackButton extends me.UITextButton {
    constructor(x, y) {
        super(x, y, {
            font : game.FONT,
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
        me.state.change(me.state.MENU);
    }
}

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

        // collect gems
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
        let gemCenterXOffset = 32;

        let diamondImage = new me.Sprite(centerX - gemCenterXOffset, currentY, {image: "diamondImage"});
        diamondImage.floating = true;
        me.game.world.addChild(diamondImage);

        let emeraldImage = new me.Sprite((centerX - gemCenterXOffset) - (gemCenterXOffset * 2), currentY, {image: "emeraldImage"});
        emeraldImage.floating = true;
        me.game.world.addChild(emeraldImage);

        let rubyImage = new me.Sprite(centerX + gemCenterXOffset, currentY, {image: "rubyImage"});
        rubyImage.floating = true;
        me.game.world.addChild(rubyImage);

        let sapphireImage = new me.Sprite((centerX + gemCenterXOffset) + (gemCenterXOffset * 2), currentY, {image: "sapphireImage"});
        sapphireImage.floating = true;
        me.game.world.addChild(sapphireImage);

        currentY += labelYOffset;

        // collect ore
        let collectOreText = new me.BitmapText(
            howToPlayX,
            currentY,
            {
                font : game.FONT,
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_LABEL,
                text : "COLLECT ORE TO PROGRESS"
            }
        );
        collectOreText.tint.setColor(0, 255, 0);
        collectOreText.floating = true;
        me.game.world.addChild(collectOreText);

        currentY += imageYOffset;

        let oreImage = new me.Sprite(centerX, currentY, {image: "oreImage"});
        oreImage.floating = true;
        me.game.world.addChild(oreImage);

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
        let enemyCenterXOffset = 50;

        let spawnlingImage = new me.Sprite(centerX, currentY, {image: "spawnlingImage"});
        spawnlingImage.floating = true;
        me.game.world.addChild(spawnlingImage);

        let sentinelImage = new me.Sprite(centerX - (enemyCenterXOffset * 2), currentY, {image: "sentinelImage"});
        sentinelImage.floating = true;
        me.game.world.addChild(sentinelImage);

        let phantomImage = new me.Sprite(centerX + (enemyCenterXOffset * 2), currentY, {image: "phantomImage"});
        phantomImage.floating = true;
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

        currentY += imageYOffset;
        let itemCenterXOffset = 50;

        let bombImage = new me.Sprite(centerX - itemCenterXOffset, currentY, {image: "bombEquipped"});
        bombImage.floating = true;
        me.game.world.addChild(bombImage);

        let missileImage = new me.Sprite((centerX - itemCenterXOffset) - (itemCenterXOffset * 2), currentY + 20, {image: "homingMissileEquipped"});
        missileImage.floating = true;
        me.game.world.addChild(missileImage);

        let teleportImage = new me.Sprite(centerX + itemCenterXOffset, currentY + 10, {image: "teleportEquipped"});
        teleportImage.floating = true;
        me.game.world.addChild(teleportImage);

        let speedImage = new me.Sprite((centerX + itemCenterXOffset) + (itemCenterXOffset * 2), currentY, {image: "speedBoostEquipped"});
        speedImage.floating = true;
        me.game.world.addChild(speedImage);

        currentY += labelYOffset + 20;

        this.backButton = new BackButton(centerX, currentY);
        this.backButton.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(this.backButton);

        me.audio.playTrack("title-theme");
    }

    onDestroyEvent() {
        me.audio.stopTrack("title-theme");
    }
}

export default HowToPlayScreen;