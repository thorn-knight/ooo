import * as me from 'melonjs';
import game from '../game.js';
import { ENEMY_TYPES } from './enemy.js';
import { getSpawnPoints } from './mapUtil.js';

var spawnedEnemyMap = new Map();
var enemySpawnPoints = [];
const ENEMY_KILL_SCORE = 50;

class EnemyManager {
    constructor() {
        this.spawnEnemyInterval = 7000;
        this.spawnEnemyIntervalId = -1;
        this.resetSpawnedEnemyMap();  
    }

    resetSpawnedEnemyMap() {
        spawnedEnemyMap.set(ENEMY_TYPES.PHANTOM, null);
        spawnedEnemyMap.set(ENEMY_TYPES.SPAWNLING, null);
        spawnedEnemyMap.set(ENEMY_TYPES.SENTINEL, null);
    }

    getSpawnPoints() {
        if (enemySpawnPoints === null || enemySpawnPoints.length === 0) {
            enemySpawnPoints = getSpawnPoints("Mineshaft");
        }
    }

    startSpawning() {
        this.getSpawnPoints();
        this.spawnEnemyIntervalId = me.timer.setInterval(this.spawnEnemy, this.spawnEnemyInterval);
    }

    spawnEnemy() {
        let spawnedEnemyCount = 0;
        let spawnableEnemytypes = [];
        spawnedEnemyMap.forEach(function(value, key) {
            if (value)
                spawnedEnemyCount++;
            else
                spawnableEnemytypes.push(key);
        });
        if (spawnedEnemyCount < spawnedEnemyMap.size) {
            // get a random mineshaft position
            let enemySpawn = enemySpawnPoints[Math.floor(Math.random() * enemySpawnPoints.length)];

            // get a random enemy type that hasn't been spawned yet
            let enemyType = spawnableEnemytypes[Math.floor(Math.random() * spawnableEnemytypes.length)];

            let enemy = me.pool.pull(enemyType, enemySpawn.x, enemySpawn.y, {width : enemySpawn.width, height : enemySpawn.height});
            enemy.pos.z = Infinity;
            spawnedEnemyMap.set(enemyType, enemy);
        }
    }

    getSpawnedEnemyNames() {
        let spawnedEnemies = [];
        spawnedEnemyMap.forEach(function(value, key) {
            if (value)
                spawnedEnemies.push(key);
        });
        return spawnedEnemies;
    }

    getEnemyByName(enemyName) {
        return spawnedEnemyMap.get(enemyName);
    }

    removeEnemyByName(enemyName) {
        game.data.score += ENEMY_KILL_SCORE;
        spawnedEnemyMap.set(enemyName, null);
    }

    reset(isNewLevel) {
        me.timer.clearInterval(this.spawnEnemyIntervalId);
        this.spawnEnemyIntervalId = -1; 
        this.resetSpawnedEnemyMap();
        if (isNewLevel)
            enemySpawnPoints = [];
    }

}

export default EnemyManager;