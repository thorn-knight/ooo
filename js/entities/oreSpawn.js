import * as me from 'melonjs';

class OreSpawn extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    }

    onResetEvent() {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    }
}

export default OreSpawn;