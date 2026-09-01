import * as me from 'melonjs';
import game from './../game.js';
import { MOVE_DIRECTION } from './entityUtil.js';
import { getMovementDirectionFromVel } from './entityUtil.js';
import { ITEM_ENTITY_NAME } from './item.js';
import { ITEM_TYPES } from './item.js';

class PlayerEntity extends me.Entity {

    constructor(x, y, settings) {
        // call the constructor
        super(x, y, settings);

        // set a "player object" type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.ALL_OBJECT);

        // walking and speed boost speeds
        this.SPEED_NORMAL = 3;
        this.SPEED_BOOSTED = 6;
        this.speedBoostDuration = 6000;
        this.speedBoostedTime = 0;
        this.isSpeedBoosted = false;
        this.body.setMaxVelocity(this.SPEED_NORMAL, this.SPEED_NORMAL);

        // flags to ignore updates and enemy collision processing when necessary
        this.ignoreUpdate = false;
        this.ignoreEnemyCollision = false;

        // reference to currently equipped item, null if nothing equipped
        this.equippedItem = null;

        // teleport target object used to teleport to position, null if there isn't one
        this.teleportTarget = null;
        this.teleportUseInterval = 0;
        this.teleportUseLock = 250;
        this.canTeleport = false;

        this.KEY_SPACE = "space";
        this.bindKeyboardInput();
        this.initAnimations();

        // set the renderable position to middle
        this.anchorPoint.set(0.5, 0.5);
    }

    bindKeyboardInput() {
        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,    "up");
        me.input.bindKey(me.input.KEY.DOWN,  "down");

        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");
        me.input.bindKey(me.input.KEY.W,     "up");
        me.input.bindKey(me.input.KEY.S,     "down");

        me.input.bindKey(me.input.KEY.SPACE, this.KEY_SPACE);
    }

    initAnimations() {

        this.renderable = game.player_texture.createAnimationFromName();

        this.renderable.addAnimation("default",  [{ name: "player_default_1.png", delay: 150 }, { name: "player_default_2.png", delay: 150 }]);

        this.renderable.addAnimation("run_right",  [
            { name: "player_run_right_1.png", delay: 100 }, 
            { name: "player_run_right_2.png", delay: 100 },
            { name: "player_run_right_3.png", delay: 100 },
            { name: "player_run_right_2.png", delay: 100 },
            { name: "player_run_right_1.png", delay: 100 }, 
            { name: "player_run_right_4.png", delay: 100 }
        ]);

        this.renderable.addAnimation("run_up", [
            { name: "player_run_up_1.png", delay: 100 },
            { name: "player_run_up_2.png", delay: 100 }, 
            { name: "player_run_up_1.png", delay: 100 },
            { name: "player_run_up_3.png", delay: 100 },
            { name: "player_run_up_4.png", delay: 100 },
            { name: "player_run_up_3.png", delay: 100 }
        ]);

        this.renderable.addAnimation("run_down", [
            { name: "player_run_down_1.png", delay: 100 },
            { name: "player_run_down_2.png", delay: 100 },
            { name: "player_run_down_1.png", delay: 100 },
            { name: "player_run_down_3.png", delay: 100 },
            { name: "player_run_down_4.png", delay: 100 },
            { name: "player_run_down_3.png", delay: 100 }
        ]);

        this.renderable.addAnimation("teleport", [
            { name: "player_teleport_1.png", delay: 100 },
            { name: "player_teleport_2.png", delay: 100 },
            { name: "player_teleport_3.png", delay: 100 },
            { name: "player_teleport_4.png", delay: 100 }
        ]);

        this.renderable.addAnimation("teleport_finish", [
            { name: "player_teleport_4.png", delay: 100 },
            { name: "player_teleport_3.png", delay: 100 },
            { name: "player_teleport_2.png", delay: 100 },
            { name: "player_teleport_1.png", delay: 100 }
        ]);

        this.renderable.addAnimation("death", [
            { name: "player_death_1.png", delay: 300 },
            { name: "player_death_2.png", delay: 300 },
            { name: "player_death_3.png", delay: 300 }
        ]);

        this.renderable.anchorPoint.set(0.5, 0.5);

        me.audio.play("teleport", false);
        this.ignoreUpdate = true;
        this.renderable.setCurrentAnimation("teleport_finish", ()=> {
            this.ignoreUpdate = false;
        });
    }

    update(dt) {

        if (!this.ignoreUpdate) {
            if (this.isSpeedBoosted) {
                this.speedBoostedTime += dt;
                if (this.speedBoostedTime >= this.speedBoostDuration) {
                    this.isSpeedBoosted = false;
                    this.speedBoostedTime = 0;
                    this.body.setMaxVelocity(this.SPEED_NORMAL, this.SPEED_NORMAL);
                }
            }
            this.setAnimationFromMoveDirection(getMovementDirectionFromVel(this.body.vel));
            this.handleKeyboardInput(dt);
        }

        super.update(dt);
        return true;
    }

    handleKeyboardInput(dt) {
        if (me.input.isKeyPressed(MOVE_DIRECTION.LEFT)) {
            this.body.force.set(-this.body.maxVel.x, 0);
        }
        else if (me.input.isKeyPressed(MOVE_DIRECTION.RIGHT)) {
            this.body.force.set(this.body.maxVel.x, 0);
        }
        else if (me.input.isKeyPressed(MOVE_DIRECTION.UP)) {
            this.body.force.set(0, -this.body.maxVel.y);
        }
        else if (me.input.isKeyPressed(MOVE_DIRECTION.DOWN)) {
            this.body.force.set(0, this.body.maxVel.y);
        }

        if (this.teleportTarget !== null && !this.canTeleport) {
            this.teleportUseInterval += dt;
            if (this.teleportUseInterval >= this.teleportUseLock) {
                this.teleportUseInterval = 0;
                this.canTeleport = true;
            }
        }

        if (me.input.isKeyPressed(this.KEY_SPACE)) {
            if (this.teleportTarget !== null && this.canTeleport) {
                this.teleport();
            }
            else {
                this.useEquippedItem();
            }
        }
    }

    onCollision(response, other) {
        let retVal = true;
        switch (other.body.collisionType) {
            case me.collision.types.COLLECTABLE_OBJECT :
                retVal = false;
                if (other.name === ITEM_ENTITY_NAME)
                    this.equipItem(other);
                break;
            case me.collision.types.ENEMY_OBJECT :
                if (!this.ignoreEnemyCollision) {
                    retVal = false;
                    this.ignoreEnemyCollision = true;
                    this.death();
                }
                break;
            default :
                break;
         }
         return retVal;
    }

    equipItem(item) {
        // only equip if nothing currently equipped
        if (this.teleportTarget == null && this.equippedItem == null && !item.inUse) {
            me.audio.play("equip", false);
            this.equippedItem = item;
            this.equippedItem.equip();
            this.hudEquipItem();
        }
    }

    useEquippedItem() {
        // only use if something is equipped
        if (this.equippedItem !== null) {

            let item = null;

            if (this.equippedItem.itemType === ITEM_TYPES.TELEPORT) {
                item = this.pullEquippedItem();
                this.teleportTarget = item;
                this.teleportTarget.use();
            }
            else {
                if (this.equippedItem.itemType === ITEM_TYPES.SPEED_BOOST) {
                    this.speedBoostBegin();
                }
                else {
                    item = this.pullEquippedItem();
                    item.use();
                }
                this.hudUnequipItem();
            }
            this.equippedItem = null;
        }
    }

    pullEquippedItem() {
        return me.pool.pull(this.equippedItem.itemType, this.pos.x, this.pos.y, 
            {width : this.equippedItem.width, height : this.equippedItem.height});       
    }

    setAnimationFromMoveDirection(moveDirection) {
        switch (moveDirection) {
            case MOVE_DIRECTION.RIGHT :
                this.renderable.flipX(false);
                this.renderable.setCurrentAnimation("run_right");
                break;
            case MOVE_DIRECTION.LEFT :
                this.renderable.flipX(true);
                this.renderable.setCurrentAnimation("run_right");
                break;
            case MOVE_DIRECTION.UP :
                this.renderable.flipX(false);
                this.renderable.setCurrentAnimation("run_up");
                break;
            case MOVE_DIRECTION.DOWN :
                this.renderable.flipX(false);
                this.renderable.setCurrentAnimation("run_down");
                break;
            case MOVE_DIRECTION.NONE :
                this.renderable.flipX(false);
                this.renderable.setCurrentAnimation("default");
                break;
            default :
                console.log("Player entity setAnimationFromMoveDirection - invalid move direction " + moveDirection + "!");
        }
    }

    speedBoostBegin() {
        me.audio.play("speed", false);
        this.body.setMaxVelocity(this.SPEED_BOOSTED, this.SPEED_BOOSTED);
        this.isSpeedBoosted = true;
    }

    teleport() {
        let targetX = this.teleportTarget.pos.x;
        let targetY = this.teleportTarget.pos.y;
        me.game.world.removeChild(this.teleportTarget);
        me.audio.play("teleport", false);
        this.hudUnequipItem();
        this.ignoreUpdate = true;
        this.canTeleport = false;
        this.body.vel.set(0, 0);
        this.renderable.setCurrentAnimation("teleport", ()=> {
            this.pos.set(targetX, targetY);
            this.teleportTarget = null;
            this.renderable.setCurrentAnimation("teleport_finish", ()=> {
                this.ignoreUpdate = false;
            });
        });
    }

    death() {
        this.body.vel.set(0, 0);
        me.audio.play("slurg", false);
        me.audio.play("death", false);
        game.data.lives--;
        this.ignoreUpdate = true;
        this.hudUnequipItem();
        this.equippedItem = null;
        this.renderable.setCurrentAnimation("death", ()=> {
            this.resetTimers();
            this.ignoreEnemyCollision = false;

            // check for game over
            if (game.data.lives === 0) {
                me.game.world.reset();
                me.state.change(me.state.GAMEOVER);
            }
            else
                me.state.get(me.state.PLAY).reset();
        });
    }

    hudEquipItem() {
        game.hud.equipItem(this.equippedItem.equippedImageName);
    }

    hudUnequipItem() {
        game.hud.unequipItem();
    }

    resetTimers() {
        game.enemyManager.reset(false);
        game.collectibleManager.reset(false);
        game.itemManager.reset(false);
    }
};

export default PlayerEntity;
