import * as me from 'melonjs';
import PathableEntity from './pathableEntity.js';

export const ITEM_ENTITY_NAME = "item";

export const ITEM_TYPES = Object.freeze({
    BOMB : "Bomb",
    HOMING_MISSILE : "HomingMissile",
    TELEPORT : "Teleport",
    SPEED_BOOST : "SpeedBoost"
});

class Item extends PathableEntity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.name = ITEM_ENTITY_NAME;
        this.itemType = null;
        this.equippedImageName = null;
        this.inUse = false;
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT | me.collision.types.ENEMY_OBJECT);
        this.initAnimations();
        this.anchorPoint.set(0.5, 0.5);
        this.usePathable = false;
        me.game.world.addChild(this);
    }

    // up to specific item to implement
    initAnimations() {
    }

    update(dt) {
        super.update(dt);
        return true;
    }

    onCollision(response, other) {
        let retVal = true;
        switch (other.body.collisionType) {
            case me.collision.types.PLAYER_OBJECT :
                retVal = false;
                break;
            case me.collision.types.ENEMY_OBJECT :
                retVal = false;
                break;
            default :
                break;
        }
        return retVal;
    }

    // up to specific item to implement
    use() {
    }

    equip() {
        me.game.world.removeChild(this);
    }

}

export default Item;