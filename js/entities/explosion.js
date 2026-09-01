import * as me from 'melonjs';
import game from './../game.js';

class Explosion extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.body.collisionType = me.collision.types.NO_OBJECT;
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        this.anchorPoint.set(0.5, 0.5);
        this.initAnimations();
        me.game.world.addChild(this);

        this.renderable.setCurrentAnimation("explode", ()=> {
            me.game.world.removeChild(this);
        });
    }

    initAnimations() {
        this.renderable = game.explosion_texture.createAnimationFromName();

        this.renderable.addAnimation("default", [
            { name: "explosion_1.png", delay: 100 },
            { name: "explosion_2.png", delay: 100 }
        ]);

        this.renderable.addAnimation("explode", [
            { name: "explosion_1.png", delay: 100 },
            { name: "explosion_2.png", delay: 100 },
            { name: "explosion_3.png", delay: 100 },
            { name: "explosion_4.png", delay: 100 }
        ]);

        this.renderable.anchorPoint.set(0.5, 0.5);
        this.renderable.setCurrentAnimation("default");
    }

    
    update(dt) {
        super.update(dt);
        return true;
    }
    
}

export default Explosion;