import * as me from 'melonjs';
import game from '../game.js';
import { getRandomWalkableGridTile, screenToGridCoords } from './mapUtil.js';
import PathableEntity from './pathableEntity.js';
import { MOVE_DIRECTION } from './entityUtil.js';

export const ENEMY_TYPES = Object.freeze({
    PHANTOM: "Phantom",
    SPAWNLING: "Spawnling",
    SENTINEL: "Sentinel"
});

class EnemyEntity extends PathableEntity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT | me.collision.types.WORLD_SHAPE | me.collision.types.COLLECTABLE_OBJECT);
        this.body.setMaxVelocity(3, 3);
        this.anchorPoint.set(0.5, 0.5);
        this.initAnimations();
        this.currentMoveDirection = MOVE_DIRECTION.NONE;
        this.standStill = false;
        me.game.world.addChild(this);
    }

    // implemented by specific enemy type
    initAnimations() {
    }

    update (dt) {
        if (!this.standStill) {
            super.update(dt);
        }
        return true;
    }

    getPathDestinationGridPos() {
        let myGridPos = screenToGridCoords(this.pos.x, this.pos.y);
        return getRandomWalkableGridTile(myGridPos);
    }

    onCollision(response, other) {
        let retVal = true;
        switch (other.body.collisionType) {
            case me.collision.types.PLAYER_OBJECT :
                if (response.overlap < game.ENTITY_COLLISION_OVERLAP_THRESHOLD) {
                    retVal = false;
                }
                else
                    this.hasKilledPlayer();
                break;
            case me.collision.types.COLLECTABLE_OBJECT :
                retVal = false;
                break;
            default :
                break;
        }
        return retVal;
    }

    hasKilledPlayer() {
        this.body.vel.set(0, 0);
        this.standStill = true;
    }
}

export default EnemyEntity;