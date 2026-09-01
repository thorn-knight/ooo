import * as me from 'melonjs';
import Item from "./item.js";
import { ITEM_TYPES } from './item.js';
import game from './../game.js';

class Bomb extends Item {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.itemType = ITEM_TYPES.BOMB;
        this.equippedImageName = "bombEquipped";
    }

    initAnimations() {
        this.renderable = game.bomb_texture.createAnimationFromName();

        this.renderable.addAnimation("default", [
            { name: "bomb_default_1.png", delay: 150 },
            { name: "bomb_default_2.png", delay: 150 }
        ]);

        this.renderable.addAnimation("armed", [
            { name: "bomb_armed_1.png", delay: 150 },
            { name: "bomb_armed_2.png", delay: 150 }
        ]);

        this.renderable.anchorPoint.set(0.5, 0.5);
        this.renderable.setCurrentAnimation("armed");
    }

    update(dt) {
        if (this.inUse)
            this.renderable.setCurrentAnimation("armed");
        else
            this.renderable.setCurrentAnimation("default");
        return super.update(dt);
    }

    onCollision(response, other) {
        let retVal = super.onCollision(response, other);
        switch (other.body.collisionType) {
            case me.collision.types.ENEMY_OBJECT :
                if (this.inUse) {
                    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
                    this.inUse = false;
                    me.audio.play("explosion", false);
                    me.game.world.removeChild(other);
                    game.enemyManager.removeEnemyByName(other.name);
                    me.game.world.removeChild(this);
                    me.pool.pull("Explosion", this.pos.x, this.pos.y, {width: 64, height: 84});
                    retVal = false;
                }
                break;
            default :
                break;
        }
        return retVal;
    }

    use() {
        this.inUse = true;
        this.renderable.setCurrentAnimation("armed");
    }
}

export default Bomb;