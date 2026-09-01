import * as me from 'melonjs';
import { screenToGridCoords, gridToScreenCoords, getPath } from './mapUtil.js';
import { MOVE_DIRECTION } from './entityUtil.js';

class PathableEntity extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.path = [];
        this.pathNextTileIndex = -1;
        this.pathNextTileScreenPos = null;
        this.moveToNextPathPoint = true;
        this.setAnimationFromVel = true;
        this.usePathable = true;
        this.forcePathRefresh = false;
    }

    update(dt) {
        if (this.usePathable) {
            this.getNewPath();
            if (this.path != null && this.path.length !== 0) {
                this.setMovementToNextPathPoint();
                this.handleReachedNextPathPoint();
            }
        }
        super.update(dt);
        return true;
    }

    getNewPath() {
        if (this.path == null || this.path.length === 0 || this.forcePathRefresh) {
            let myGridPos = screenToGridCoords(this.pos.x, this.pos.y);
            let pathDestinationGridPos = this.getPathDestinationGridPos();
            if (pathDestinationGridPos == null)
                this.path = [];
            else {
                this.path = getPath(myGridPos, pathDestinationGridPos);
                if (this.path !== null && this.path.length !== 0) {
                    this.pathNextTileIndex = 0;
                    this.pathNextTileScreenPos = gridToScreenCoords(this.path[this.pathNextTileIndex]);
                }
                else {
                    console.log("WARNING getNewPath() null or empty path found!");
                }
            }
            this.forcePathRefresh = false;
        }
    }

    // child class to implement
    getPathDestinationGridPos() {
    }

    setMovementToNextPathPoint() {
        if (this.moveToNextPathPoint) {
            this.pathNextTileScreenPos = gridToScreenCoords(this.path[this.pathNextTileIndex]);

            if (this.pathNextTileScreenPos.x > this.pos.x) {
                this.body.vel.set(this.body.maxVel.x, 0);
                this.currentMoveDirection = MOVE_DIRECTION.RIGHT;
            }
            else if (this.pathNextTileScreenPos.x < this.pos.x) {
                this.body.vel.set(-this.body.maxVel.x, 0);
                this.currentMoveDirection = MOVE_DIRECTION.LEFT;
            } 
            else if (this.pathNextTileScreenPos.y > this.pos.y) {
                this.body.vel.set(0, this.body.maxVel.y);
                this.currentMoveDirection = MOVE_DIRECTION.DOWN;
            } 
            else {
                this.body.vel.set(0, -this.body.maxVel.y);
                this.currentMoveDirection = MOVE_DIRECTION.UP;
            }

            this.moveToNextPathPoint = false;
        }
    }

    handleReachedNextPathPoint() {
        if (this.hasReachedNextPathPoint()) {
            this.moveToNextPathPoint = true;
            this.body.vel.set(0, 0);
            this.pos.set(this.pathNextTileScreenPos.x, this.pathNextTileScreenPos.y);
            this.setAnimationFromVel = false;
            if (this.hasReachedEndOfPath()) {
                this.path = [];
            }
            else {
                this.pathNextTileIndex++;
            }
        }
    }

    hasReachedNextPathPoint() {
        let hasReached = false;
        if (this.pos.x == this.pathNextTileScreenPos.x && this.pos.y == this.pathNextTileScreenPos.y)
            hasReached = true;
        else {
            switch (this.currentMoveDirection) {
                case MOVE_DIRECTION.RIGHT :
                    if (this.pos.x >= this.pathNextTileScreenPos.x)
                        hasReached = true;
                    break;
                case MOVE_DIRECTION.LEFT :
                    if (this.pos.x <= this.pathNextTileScreenPos.x)
                        hasReached = true;
                    break;
                case MOVE_DIRECTION.UP :
                    if (this.pos.y <= this.pathNextTileScreenPos.y)
                        hasReached = true;
                    break;
                case MOVE_DIRECTION.DOWN :
                    if (this.pos.y >= this.pathNextTileScreenPos.y)
                        hasReached = true;
                    break;
                default :
            }
        }
        return hasReached;
    }

    hasReachedEndOfPath() {
        return (this.pathNextTileIndex === this.path.length - 1);
    }

}

export default PathableEntity;