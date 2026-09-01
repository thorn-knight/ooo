import * as me from 'melonjs';

// Represents a gem spawn point on the map.
class GemSpawn extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    }

    onResetEvent() {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    }
}

export default GemSpawn;