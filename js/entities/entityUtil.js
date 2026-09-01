
export const MOVE_DIRECTION = Object.freeze({
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
    NONE: "none"
});

export function getMovementDirectionFromVel(vel) {
    let moveDirection = null;
    if (vel.x > 0) {
        moveDirection = MOVE_DIRECTION.RIGHT;
    }
    else if (vel.x < 0) {
        moveDirection = MOVE_DIRECTION.LEFT;
    }
    else if (vel.y < 0) {
        moveDirection = MOVE_DIRECTION.UP;
    }
    else if (vel.y > 0) {
        moveDirection = MOVE_DIRECTION.DOWN;
    }
    else {
        moveDirection = MOVE_DIRECTION.NONE;
    }
    return moveDirection;
}