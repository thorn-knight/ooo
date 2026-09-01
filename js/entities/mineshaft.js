import * as me from 'melonjs';

// Represents a mineshaft, an enemy spawn point on the map
class Mineshaft extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    }

    onResetEvent() {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    }
}

export default Mineshaft;