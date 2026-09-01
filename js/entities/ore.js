import * as me from 'melonjs';
import game from './../game.js';

class Ore extends me.Entity {
    constructor(x, y, settings) { 
        super(x, y, settings);
        this.anchorPoint.set(0.5, 0.5);
        this.initAnimations();
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
        this.scoreValue = 100;
        me.game.world.addChild(this);
    }

    initAnimations() {
        this.renderable = game.ore_texture.createAnimationFromName();

        this.renderable.addAnimation("sparkle", [
            { name: "ore_sparkle_1.png", delay: 100 },
            { name: "ore_default_1.png", delay: 100 },
            { name: "ore_sparkle_2.png", delay: 100 }
        ]);

        this.renderable.anchorPoint.set(0.5, 0.5);
        this.renderable.setCurrentAnimation("sparkle");
    }

    onCollision(response, other) {
        // play sfx, increase score, remove from level, update hud
        me.audio.play("pickup", false);
        game.data.score += this.scoreValue;
        game.data.ore++;
        this.body.collisionType = me.collision.types.NO_OBJECT;
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.game.world.removeChild(this);
        return false;
    }
}

export default Ore;