import Item from "./item.js";
import { ITEM_TYPES } from './item.js';
import game from './../game.js';

class SpeedBoost extends Item {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.itemType = ITEM_TYPES.SPEED_BOOST;
        this.equippedImageName = "speedBoostEquipped";
    }

    initAnimations() {
        this.renderable = game.speed_boost_texture.createAnimationFromName();

        this.renderable.addAnimation("temp", [
            { name: "speedBoost_default_1.png", delay: 80 },
            { name: "speedBoost_default_2.png", delay: 80 },
            { name: "speedBoost_default_3.png", delay: 80 }
        ]);

        this.renderable.addAnimation("default", [
            { name: "speedBoost_default_1.png", delay: 80 },
            { name: "speedBoost_default_2.png", delay: 80 },
            { name: "speedBoost_default_3.png", delay: 80 },
            { name: "speedBoost_default_2.png", delay: 80 },
            { name: "speedBoost_default_1.png", delay: 80 }
        ]);

        this.renderable.anchorPoint.set(0.5, 0.5);
        this.renderable.setCurrentAnimation("temp");
        this.renderable.setCurrentAnimation("default");
    }

    use() {
        this.inUse = true;
    }
}

export default SpeedBoost;