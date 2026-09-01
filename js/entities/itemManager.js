import * as me from 'melonjs';
import { getSpawnPoints } from './mapUtil.js';
import { ITEM_TYPES } from './item.js';

var itemSpawnList = [];
var itemList = [];
const itemTypes = Object.values(ITEM_TYPES);

class ItemManager {
    constructor() {
        this.spawnItemInterval = 8000;
        this.spawnItemIntervalId = -1;
    }

    startSpawning() {
        this.getItemSpawnPoints();
        this.spawnItemIntervalId = me.timer.setInterval(this.spawnItem, this.spawnItemInterval);
    }

    getItemSpawnPoints() {
        if (itemSpawnList == null || itemSpawnList.length === 0) {
            itemSpawnList = getSpawnPoints("ItemSpawnList");
        }
    }

    spawnItem() {
        const maxItemsPerLevel = itemSpawnList.length;
        if (itemList.length < maxItemsPerLevel) {
            // get a random item type and the next spawn point
            let itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            let itemSpawn = itemSpawnList[itemList.length];
            const item = me.pool.pull(itemType, itemSpawn.x, itemSpawn.y, {width : itemSpawn.width, height : itemSpawn.height});
            itemList.push(item);
        }
    }

    reset(isNewLevel) {
        me.timer.clearInterval(this.spawnItemIntervalId);
        this.spawnItemIntervalId = -1;
        itemList = [];
        if (isNewLevel)
            itemSpawnList = [];
    }
}

export default ItemManager;