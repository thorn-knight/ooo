import * as me from 'melonjs';
import game from '../game.js';

const BUTTON_OFFSET_WIDTH = 40;
const BUTTON_OFFSET_HEIGHT = 20;

class PlayButton extends me.UITextButton {
    constructor(x, y) {
        super(x, y, {
            font : "PressStart2P",
            text : "PLAY",
            fillStyle : '#000000',
            textAlign : "center",
            textBaseline : "middle",
            size : game.TEXT_SIZE_BUTTON,
            hoverOffColor: '#00FF00',
            hoverOnColor: 'rgb(22, 152, 22)'
        });
        this.floating = true;
    }

    onClick(event) {
        me.state.change(me.state.PLAY);
    }
}

class HowToPlayButton extends me.UITextButton {
    constructor(x, y) {
        super(x, y, {
            font : "PressStart2P",
            text : "HOW TO PLAY",
            fillStyle : '#000000',
            textAlign : "center",
            textBaseline : "middle",
            size : game.TEXT_SIZE_BUTTON,
            hoverOffColor: '#00FF00',
            hoverOnColor: 'rgb(22, 152, 22)'        
        });
        this.floating = true;
    }
}

class TitleScreen extends me.Stage {
    onResetEvent() {
        // background color and image
        me.game.world.backgroundColor.parseCSS(game.BACKGROUND_COLOR);
        let bgSprite = new me.Sprite(me.game.viewport.centerX, me.game.viewport.centerY, {image: "title_gameover_bg"});
        bgSprite.anchorPoint.set(0.5, 0.5);
        bgSprite.floating = true;
        me.game.world.addChild(bgSprite, -1);

        // title text
        let titleX = me.game.viewport.width / 2;
        let titleY = me.game.viewport.width / 8;
        let titleText = new me.BitmapText(
            titleX,
            titleY,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : game.TEXT_SIZE_TITLE,
                text : "OUTRAGEOUS ORBITAL ORE"
            }
        );
        titleText.tint.setColor(0, 255, 0);
        titleText.floating = true;
        me.game.world.addChild(titleText, 1);

        this.playButton = new PlayButton(titleX, titleY + 100);
        this.playButton.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(this.playButton, 2);

        this.howToPlayButton = new HowToPlayButton(titleX, titleY + 200);
        this.howToPlayButton.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(this.howToPlayButton, 3);

        // bgm
        me.audio.playTrack("title-theme");
    }

    onDestroyEvent() {
        me.audio.stopTrack("title-theme");
    }
}

export default TitleScreen;