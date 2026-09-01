import * as me from 'melonjs';
import Item from "./item.js";
import { ITEM_TYPES } from './item.js';
import game from './../game.js';

class Teleport extends Item {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.itemType = ITEM_TYPES.TELEPORT;
        this.equippedImageName = "teleportEquipped";
    }

    initAnimations() {
        this.renderable = game.teleport_texture.createAnimationFromName();

        this.renderable.addAnimation("default", [
            { name: "teleport_default_1.png", delay: 150 }
        ]);

        this.renderable.addAnimation("inUse", [
            { name: "teleport_default_1.png", delay: 150 },
            { name: "teleport_default_2.png", delay: 150 }
        ]);

        this.renderable.anchorPoint.set(0.5, 0.5);
        this.renderable.setCurrentAnimation("inUse");
    }

    update(dt) {
        // spin around if not in use/animating
        if (!this.inUse) {
            this.renderable.setCurrentAnimation("default");
            this.renderable.rotate(Math.PI / 180);
        }
        return super.update(dt);
    }

    use() {
        this.inUse = true;
        this.renderable.setCurrentAnimation("inUse");
    }

}

export default Teleport;