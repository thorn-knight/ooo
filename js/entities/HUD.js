import * as me from 'melonjs';
import game from './../game.js';

/**
 * HUD item to display score
 */
class ScoreItem extends me.BitmapText {

    constructor(x, y) {
        // call the super constructor
        super(
            x,
            y,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 1,
                text : "Score : 0"
            }
        );

        this.relative = new me.Vector2d(x, y);
        this.floating = false;

        // local copy of the global score
        this.score = -1;
    }

    update(dt) {
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            this.setText("Score : " + this.score);
            this.isDirty = true;
        }
        return super.update(dt);
    }
}

class LevelItem extends me.BitmapText {
    constructor(x, y) {
        super(
            x,
            y,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 1,
                text : "Level : 0"
            }
        );

        this.relative = new me.Vector2d(x, y);
        this.floating = false;

        // local copy of level number
        this.level = -1;
    }

    update(dt) {
        if (this.level !== game.data.level) {
            this.level = game.data.level;
            this.setText("Level : " + this.level);
            this.isDirty = true;
        }
        return super.update(dt);
    }
}

/* HUD item to display lives count */
class LivesCountItem extends me.BitmapText {
    constructor(x, y) {
        super(
            x,
            y,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 1,
                text : " : "
            }
        );

        this.relative = new me.Vector2d(x, y);
        this.floating = false;

        // local copy of lives count
        this.livesCount = -1;
    }

    update(dt) {
        if (this.livesCount !== game.data.lives) {
            this.livesCount = game.data.lives;
            this.setText(": " + this.livesCount);
            this.isDirty = true;
        }
        return super.update(dt);
    }
}

/* HUD item to display ore count */
class OreCountItem extends me.BitmapText {
    constructor(x, y) {
        super(
            x,
            y,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 1,
                text : ": "
            }
        );

        this.relative = new me.Vector2d(x, y);
        this.floating = false;

        // local copy of game ore count
        this.oreCount = 0;
        this.setText(": " + this.oreCount + "/" + game.data.oreRequiredThisLevel);
    }

    update(dt) {
        if (this.oreCount !== game.data.ore) {
            this.oreCount = game.data.ore;
            this.setText(": " + this.oreCount + "/" + game.data.oreRequiredThisLevel);
            this.isDirty = true;
            if (this.oreCount === game.data.oreRequiredThisLevel) {
                this.resetTimers(true);
                game.data.loadNextLevel = true;
                me.state.get(me.state.PLAY).reset();
            }
        }
        return super.update(dt);
    }

    resetTimers(isNewLevel) {
        game.enemyManager.reset(isNewLevel);
        game.collectibleManager.reset(isNewLevel);
        game.itemManager.reset(isNewLevel);
    }
}

/**
 * a HUD container and child items
 */
class UIContainer extends me.Container {

    constructor() {
        // call the constructor
        super();

        // Use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        let bounds = me.level.getCurrentLevel().getBounds();

        // level 
        let levelXPos = bounds.right + 200;
        let levelYPos = bounds.top + 40;
        this.levelItem = new LevelItem(levelXPos, levelYPos);
        this.levelItem.tint.setColor(0, 255, 0);
        this.levelItem.z = Infinity;

        // score
        let scoreXPos = bounds.right + 200;
        let scoreYPos = bounds.top + 80;
        this.scoreItem = new ScoreItem(scoreXPos, scoreYPos);
        this.scoreItem.tint.setColor(0, 255, 0);
        this.scoreItem.z = Infinity;

        // lives
        let livesIconXPos = bounds.right + 150;
        let livesIconYPos = bounds.top + 150;
        this.livesIcon = new me.Sprite(livesIconXPos, livesIconYPos, {image: "livesIcon"});
        this.livesIcon.relative = new me.Vector2d(livesIconXPos, livesIconYPos);
        this.livesIcon.floating = false;
        this.livesIcon.z = Infinity;

        let livesCountXPos = bounds.right + 225;
        let livesCountYPos = bounds.top + 175;
        this.livesCountItem = new LivesCountItem(livesCountXPos, livesCountYPos);
        this.livesCountItem.z = Infinity;
        this.livesCountItem.tint.setColor(0, 255, 0);

        // equipped item label
        let equippedLabelXPos = bounds.right + 150;
        let equippedLabelYPos = bounds.top + 250;
        this.equippedLabel = new me.BitmapText(
            equippedLabelXPos,
            equippedLabelYPos,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                size : 1,
                text : "Equipped: "
            }
        );
        this.equippedLabel.relative = new me.Vector2d(equippedLabelXPos, equippedLabelYPos);
        this.equippedLabel.floating = false;
        this.equippedLabel.z = Infinity;
        this.equippedLabel.tint.setColor(0, 255, 0);

        // equipped item area, hud itself will update this
        this.equippedAreaXPos = bounds.right + 300;
        this.equippedAreaYPos = bounds.top + 235;

        // equipped item sprite image
        this.equippedItemSprite = null;
        this.isEquipped = false;

        // ore icon and count
        let oreIconXPos = bounds.right + 150;
        let oreIconYPos = bounds.top + 325;
        this.oreIcon = new me.Sprite(oreIconXPos, oreIconYPos, {image: "oreImage"});
        this.oreIcon.relative = new me.Vector2d(oreIconXPos, oreIconYPos);
        this.oreIcon.floating = false;
        this.oreIcon.z = Infinity;

        let oreCountXPos = bounds.right + 250;
        let oreCountYPos = bounds.top + 350;
        this.oreCountItem = new OreCountItem(oreCountXPos, oreCountYPos);
        this.oreCountItem.z = Infinity;
        this.oreCountItem.tint.setColor(0, 255, 0);

        // add our child elements
        me.game.world.addChild(this.levelItem);
        me.game.world.addChild(this.scoreItem);
        me.game.world.addChild(this.livesIcon);
        me.game.world.addChild(this.livesCountItem);
        me.game.world.addChild(this.equippedLabel);
        me.game.world.addChild(this.oreIcon);
        me.game.world.addChild(this.oreCountItem);
    }

    equipItem(imageName) {
        this.equippedItemSprite = new me.Sprite(this.equippedAreaXPos, this.equippedAreaYPos, {image: imageName});
        me.game.world.addChild(this.equippedItemSprite);
        this.isEquipped = true;
    }

    unequipItem() {
        if (this.isEquipped) {
            me.game.world.removeChild(this.equippedItemSprite);
            this.isEquipped = false;
        }
    }
};

export default UIContainer;
