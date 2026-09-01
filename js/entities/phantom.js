import * as me from 'melonjs';
import game from './../game.js';
import EnemyEntity from './enemy.js';
import { ENEMY_TYPES } from './enemy.js';
import { MOVE_DIRECTION, getMovementDirectionFromVel } from './entityUtil.js';

class Phantom extends EnemyEntity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.name = ENEMY_TYPES.PHANTOM;
    }

    initAnimations() {

        this.renderable = game.phantom_texture.createAnimationFromName();

        this.renderable.addAnimation("run_right", [
            { name: "phantom_run_right_1.png", delay: 150 },
            { name: "phantom_run_right_2.png", delay: 150 }
        ]);

        this.renderable.addAnimation("run_down", [
            { name: "phantom_run_down_1.png", delay: 150 },
            { name: "phantom_run_down_2.png", delay: 150 }
        ]);

        this.renderable.addAnimation("run_up", [
            { name: "phantom_run_up_1.png", delay: 150 },
            { name: "phantom_run_up_2.png", delay: 150 }
        ]);

        this.renderable.addAnimation("teleport", [
            { name: "phantom_teleport_1.png", delay: 100 },
            { name: "phantom_teleport_2.png", delay: 100 },
            { name: "phantom_teleport_3.png", delay: 100 },
            { name: "phantom_teleport_4.png", delay: 100 },
        ]);

        this.renderable.anchorPoint.set(0.5, 0.5);
        this.renderable.setCurrentAnimation("run_down");
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
                this.renderable.setCurrentAnimation("run_down");
                break;
            default :
                console.log("Phantom setAnimationFromMoveDirection - invalid move direction " + moveDirection + "!");
        }
    }

    update(dt) {
        super.update(dt);
        if (this.setAnimationFromVel) 
            this.setAnimationFromMoveDirection(getMovementDirectionFromVel(this.body.vel));
        else
            this.setAnimationFromVel = true;
            
        return true;
    }

}

export default Phantom;