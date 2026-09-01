import * as me from 'melonjs';
import game from '../game.js';
import { GEMTYPES } from './gem.js';
import { getSpawnPoints } from './mapUtil.js';

const gemTypesArray = Object.values(GEMTYPES);

var gemSpawnList = [];
var gemList = [];
var oreSpawnList = [];
var oreList = [];

class CollectibleManager {
    constructor() {
        // spawn interval
        console.log("collectible manager constructor called...");
        this.spawnGemInterval = 7000;
        this.spawnGemIntervalId = -1;
        this.spawnOreInterval = 8000;
        this.spawnOreIntervalId = -1;  
    }

    startSpawning() {
        this.getGemSpawnPoints();
        this.spawnGemIntervalId = me.timer.setInterval(this.spawnGem, this.spawnGemInterval);

        this.getOreSpawnPoints();
        this.spawnOreIntervalId = me.timer.setInterval(this.spawnOre, this.spawnOreInterval);
    }

    getGemSpawnPoints() {
        if (gemSpawnList == null || gemSpawnList.length === 0) {
            gemSpawnList = getSpawnPoints("GemSpawnList");
        }
    }

    getOreSpawnPoints() {
        if (oreSpawnList == null || oreSpawnList.length === 0) {
            oreSpawnList = getSpawnPoints("OreSpawnList");
            game.data.oreRequiredThisLevel = oreSpawnList.length;
        }
    }

    spawnGem() {
        const maxGemsThisLevel = gemSpawnList.length;
        if (gemList.length < maxGemsThisLevel) {
            let gemType = gemTypesArray[Math.floor(Math.random() * gemTypesArray.length)];
            let gemSpawn = gemSpawnList[gemList.length];
            const gem = me.pool.pull("Gem", gemSpawn.x, gemSpawn.y, {gemType : gemType, width : gemSpawn.width, height : gemSpawn.height});
            gemList.push(gem);
        }
    }

    spawnOre() {
        const maxOreThisLevel = oreSpawnList.length;
        if (oreList.length < maxOreThisLevel) {
            let oreSpawn = oreSpawnList[oreList.length];
            const ore = me.pool.pull("Ore", oreSpawn.x, oreSpawn.y, {width : oreSpawn.width, height : oreSpawn.height});
            oreList.push(ore);
        }
    }

    reset(isNewLevel) {
        console.log("collectible manager reset called");
        console.log("spawnGemIntervalId is: " + this.spawnGemIntervalId);
        console.log("spawnOreIntervalId is: " + this.spawnOreIntervalId);
        me.timer.clearInterval(this.spawnGemIntervalId);
        me.timer.clearInterval(this.spawnOreIntervalId);
        this.spawnGemIntervalId = -1;
        this.spawnOreIntervalId = -1;
        gemList = [];
        oreList = [];
        if (isNewLevel) {
            gemSpawnList = [];
            oreSpawnList = [];
        }
    }

}

export default CollectibleManager;
