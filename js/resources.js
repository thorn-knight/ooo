var resources = [

    /* Map resources */
    { name: "mars-tileset", type:"json", src:"data/map/mars/mars-tileset.json" },
    { name: "mars-tileset", type:"tsx", src:"data/map/mars/mars-tileset.tsx" },
    { name: "mars-tileset", type:"image", src:"data/map/mars/mars-tileset.png" },
    { name: "mars-map1", type:"json", src:"data/map/mars/mars-map1.json" },
    { name: "mars-map1", type:"tmx", src:"data/map/mars/mars-map1.tmx" },

    /* Textures for animation resources */
    { name: "playerTexture", type:"json", src:"data/img/player/playerTexture.json" },
    { name: "playerTexture", type:"image", src:"data/img/player/playerTexture.png" },
    { name: "playerDead", type:"image", src:"data/img/player/player_death_3.png" },      

    { name: "gemsTexture", type:"json", src:"data/img/collectible/gems/gems.json" },
    { name: "gemsTexture", type:"image", src:"data/img/collectible/gems/gems.png" },

    { name: "diamondImage", type:"image", src:"data/img/collectible/gems/diamond_2.png" },
    { name: "emeraldImage", type:"image", src:"data/img/collectible/gems/emerald_2.png" },
    { name: "rubyImage", type:"image", src:"data/img/collectible/gems/ruby_2.png" },
    { name: "sapphireImage", type:"image", src:"data/img/collectible/gems/sapphire_2.png" },

    { name: "oreTexture", type:"json", src:"data/img/collectible/ore/ore.json" },
    { name: "oreTexture", type:"image", src:"data/img/collectible/ore/ore.png" },
    { name: "oreImage", type:"image", src:"data/img/collectible/ore/ore_default_1.png" },
    
    { name: "phantomTexture", type:"json", src:"data/img/enemy/phantom/phantom.json" },
    { name: "phantomTexture", type:"image", src:"data/img/enemy/phantom/phantom.png" },
    { name: "phantomImage", type:"image", src:"data/img/enemy/phantom/phantom_run_right_1.png" },

    { name: "spawnlingTexture", type:"json", src:"data/img/enemy/spawnling/spawnling.json" },
    { name: "spawnlingTexture", type:"image", src:"data/img/enemy/spawnling/spawnling.png" },
    { name: "spawnlingImage", type:"image", src:"data/img/enemy/spawnling/spawnling_run_right_2.png" },

    { name: "sentinelTexture", type:"json", src:"data/img/enemy/sentinel/sentinel.json" },
    { name: "sentinelTexture", type:"image", src:"data/img/enemy/sentinel/sentinel.png" },
    { name: "sentinelImage", type:"image", src:"data/img/enemy/sentinel/sentinel_run_forward_1.png" },

    { name: "bombTexture", type:"json", src:"data/img/item/bomb/bomb.json" },
    { name: "bombTexture", type:"image", src:"data/img/item/bomb/bomb.png" },
    { name: "bombEquipped", type:"image", src:"data/img/item/bomb/bomb_armed_1.png" },

    { name: "homingMissileTexture", type:"json", src:"data/img/item/homingMissile/homingMissile.json" },
    { name: "homingMissileTexture", type:"image", src:"data/img/item/homingMissile/homingMissile.png" },
    { name: "homingMissileEquipped", type:"image", src:"data/img/item/homingMissile/homingMissile_default_1.png" },

    { name: "teleportTexture", type:"json", src:"data/img/item/teleport/teleport.json" },
    { name: "teleportTexture", type:"image", src:"data/img/item/teleport/teleport.png" },
    { name: "teleportEquipped", type:"image", src:"data/img/item/teleport/teleport_default_1.png" },

    { name: "speedBoostTexture", type:"json", src:"data/img/item/speedBoost/speedBoost.json" },
    { name: "speedBoostTexture", type:"image", src:"data/img/item/speedBoost/speedBoost.png" },
    { name: "speedBoostEquipped", type:"image", src:"data/img/item/speedBoost/speedBoost_default_3.png" },

    { name: "explosionTexture", type:"json", src:"data/img/effect/explosion/explosion.json" },
    { name: "explosionTexture", type:"image", src:"data/img/effect/explosion/explosion.png" },

    /* Background screen image */
    { name: "title_gameover_bg", type:"image", src:"data/img/background/title_gameover_bg.png" },

    /* HUD image resources */
    { name: "livesIcon", type:"image", src:"data/img/hud/lives/lives.png" },

    /* BGM */
    { name: "title-theme", type:"audio", src:"data/bgm/" },
    { name: "gameplay-theme", type:"audio", src:"data/bgm/" },
    { name: "gameover-theme", type:"audio", src:"data/bgm/" },

    /* SFX */
    { name: "pickup", type: "audio", src: "data/sfx/" },
    { name: "death", type: "audio", src: "data/sfx/" },
    { name: "slurg", type: "audio", src: "data/sfx/" },
    { name: "explosion", type: "audio", src: "data/sfx/" },
    { name: "equip", type: "audio", src: "data/sfx/" },
    { name: "teleport", type: "audio", src: "data/sfx/" },
    { name: "speed", type: "audio", src: "data/sfx/" },
    { name: "level_complete", type: "audio", src: "data/sfx/" },

    /* Bitmap/fonts */
    { name: "PressStart2P", type:"image", src: "data/fnt/PressStart2P.png" },
    { name: "PressStart2P", type:"binary", src: "data/fnt/PressStart2P.fnt"}

];

export default resources;
