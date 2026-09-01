import * as me from 'melonjs';
import game from './../game.js';

export const GEMTYPES = Object.freeze({
    EMERALD : "emerald",
    RUBY : "ruby",
    SAPPHIRE : "sapphire",
    DIAMOND : "diamond"
});

export const GEM_ENTITY_NAME = "gem";

class GemEntity extends me.Entity {

    constructor(x, y, settings) { 
        super(x, y , settings);
        this.name = GEM_ENTITY_NAME;
        this.createFromGemType(settings.gemType);
    }

    onResetEvent(x, y, settings) {
        this.shift(x, y);
        this.createFromGemType(settings.gemType);
    }

    createFromGemType(gemType) {
        this.gemType = gemType;
        this.scoreValue = 0;
        switch (this.gemType) {
            case GEMTYPES.RUBY :
                this.scoreValue = 100;
                break;
            case GEMTYPES.EMERALD :
                this.scoreValue = 150;
                 break;
            case GEMTYPES.SAPPHIRE :
                this.scoreValue = 200;
                break;
            case GEMTYPES.DIAMOND :
                this.scoreValue = 250;
                break;
            default :
        }
        let file1 = this.gemType + "_1.png";
        let file2 = this.gemType + "_2.png";
        this.renderable = game.gems_texture.createAnimationFromName([
            file1, file2
        ]);
        this.renderable.addAnimation("sparkle",  [{ name: file1, delay: 100 }, { name: file2, delay: 50 }]);
        this.renderable.setCurrentAnimation("sparkle");
        this.anchorPoint.set(0.5, 0.5);
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
        me.game.world.addChild(this);
    }

    onCollision() {
        // play sound effect, increase score, then delete it from the map
        me.audio.play("pickup", false);
        game.data.score += this.scoreValue;
        this.body.collisionType = me.collision.types.NO_OBJECT;
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.game.world.removeChild(this);
        return false;
    }
}

export default GemEntity;