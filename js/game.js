/**
 * hold all game specific data
 */

var game = {

    data : {
        level : 1,
        score : 0,
        lives : 3,
        ore : 0,
        oreRequiredThisLevel : 0,
        loadNextLevel : false
    },

    // animation textures
    player_texture : null,
    phantom_texture : null,
    spawnling_texture : null,
    sentinel_texture: null,
    bomb_texture: null,
    homing_missile_texture : null,
    teleport_texture : null,
    speed_boost_texture : null,
    explosion_texture: null,
    gems_texture : null,
    ore_texture : null,

    // hud reference
    hud : null,

    // game logic managers
    itemManager : null,
    collectibleManager : null,
    enemyManager : null,

    BACKGROUND_COLOR : "#313431"
};

export default game;
