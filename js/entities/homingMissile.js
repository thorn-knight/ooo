import * as me from 'melonjs';
import Item from "./item.js";
import { ITEM_TYPES } from './item.js';
import game from './../game.js';
import { screenToGridCoords } from './mapUtil.js';
import { MOVE_DIRECTION, getMovementDirectionFromVel } from './entityUtil.js';

class HomingMissile extends Item {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.itemType = ITEM_TYPES.HOMING_MISSILE;
        this.equippedImageName = "homingMissileEquipped";
        this.body.setMaxVelocity(6, 6);
        this.targetEnemy = null;
        this.pathRefreshInterval = 0;
    }

    initAnimations() {
        this.renderable = game.homing_missile_texture.createAnimationFromName();

        this.renderable.addAnimation("default", [
            { name: "homingMissile_default_1.png", delay: 150 },
            { name: "homingMissile_default_2.png", delay: 100 }
        ]);

        this.renderable.addAnimation("up", [
            { name: "homingMissile_up_1.png", delay: 150 },
            { name: "homingMissile_up_2.png", delay: 100 }
        ]);

        this.renderable.addAnimation("down", [
            { name: "homingMissile_down_1.png", delay: 150 },
            { name: "homingMissile_down_2.png", delay: 100 }
        ]);

        this.renderable.anchorPoint.set(0.5, 0.5);
        this.renderable.setCurrentAnimation("up");
    }

    setAnimationFromMoveDirection(moveDirection) {
        switch (moveDirection) {
            case MOVE_DIRECTION.RIGHT :
                this.renderable.setCurrentAnimation("default");
                this.renderable.flipX(true);
                break;
            case MOVE_DIRECTION.LEFT :
                this.renderable.setCurrentAnimation("default");
                this.renderable.flipX(false);
                break;
            case MOVE_DIRECTION.UP :
                this.renderable.setCurrentAnimation("up");
                this.renderable.flipX(false);
                break;
            case MOVE_DIRECTION.DOWN :
                this.renderable.setCurrentAnimation("down");
                this.renderable.flipX(false);
                break;
            case MOVE_DIRECTION.NONE :
                this.renderable.setCurrentAnimation("default");
                this.renderable.flipX(false);
                break;
            default :
                console.log("HomingMissile setAnimationFromMoveDirection - invalid move direction " + moveDirection + "!");
        }
    }

    update(dt) {
        this.renderable.setCurrentAnimation("default");
        this.pathRefreshInterval += dt;
        if (this.pathRefreshInterval >= 500) {
            this.forcePathRefresh = true;
            this.pathRefreshInterval = 0;
        }
        if (this.inUse) {
            // check we have a target enemy and it's still spawned
            // eg we didn't previously target it and it's since been blown up by a bomb, etc
            if (this.targetEnemy == null || game.enemyManager.getEnemyByName(this.targetEnemy.name) === null) {
                // stop moving and try to get a new target enemy
                this.body.vel.set(0, 0);
                this.usePathable = false;
                this.getTargetEnemy();
            }
            else {
                // we have a target enemy that's still on the map, chase it!
                this.usePathable = true;
            }
        }
        super.update(dt);
        if (this.setAnimationFromVel)
            this.setAnimationFromMoveDirection(getMovementDirectionFromVel(this.body.vel));
        else
            this.setAnimationFromVel = true;
        return true;
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
                    me.timer.clearInterval(this.pathRefreshIntervalId);
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

    getTargetEnemy() {
        // get a random spawned enemy or return null
        let spawnedEnemyNames = game.enemyManager.getSpawnedEnemyNames();
        if (spawnedEnemyNames.length > 0) {
            let enemyName = spawnedEnemyNames[Math.floor(Math.random() * spawnedEnemyNames.length)];
            this.targetEnemy = game.enemyManager.getEnemyByName(enemyName);
        }
        else
            this.targetEnemy = null;
    }

    getPathDestinationGridPos() {
        return screenToGridCoords(this.targetEnemy.pos.x, this.targetEnemy.pos.y);
    }

    use() {
        this.inUse = true;
    }
}

export default HomingMissile;