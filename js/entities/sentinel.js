import game from './../game.js';
import EnemyEntity from './enemy.js';
import { ENEMY_TYPES } from './enemy.js';
import { MOVE_DIRECTION, getMovementDirectionFromVel } from './entityUtil.js';

class Sentinel extends EnemyEntity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.name = ENEMY_TYPES.SENTINEL;
    }

    initAnimations() {
        this.renderable = game.sentinel_texture.createAnimationFromName();

        this.renderable.addAnimation("run_forward", [
            { name: "sentinel_run_forward_1.png", delay: 100 },
            { name: "sentinel_run_forward_2.png", delay: 100 },
            { name: "sentinel_run_forward_3.png", delay: 100 },
            { name: "sentinel_run_forward_4.png", delay: 100 }
        ]);

        this.renderable.addAnimation("run_backward", [
            { name: "sentinel_run_backward_1.png", delay: 100 },
            { name: "sentinel_run_backward_2.png", delay: 100 },
            { name: "sentinel_run_backward_3.png", delay: 100 },
            { name: "sentinel_run_backward_4.png", delay: 100 }
        ]);

        this.renderable.anchorPoint.set(0.5, 0.5);
        this.renderable.setCurrentAnimation("run_forward");
    }

    setAnimationFromMoveDirection(moveDirection) {
        switch (moveDirection) {
            case MOVE_DIRECTION.RIGHT :
                this.renderable.setCurrentAnimation("run_forward");
                break;
            case MOVE_DIRECTION.LEFT :
                this.renderable.setCurrentAnimation("run_forward");
                break;
            case MOVE_DIRECTION.UP :
                this.renderable.setCurrentAnimation("run_backward");
                break;
            case MOVE_DIRECTION.DOWN :
                this.renderable.setCurrentAnimation("run_forward");
                break;
            case MOVE_DIRECTION.NONE :
                this.renderable.setCurrentAnimation("run_forward");
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

export default Sentinel;