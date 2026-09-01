import * as me from 'melonjs';

var levelMatrix = null;
var walkableGridTiles = [];

// Builds a 2d array of 0s (walls) and 1s (walkable tiles) from the current level
export function getGraphMatrixFromCurrentLevel() {
    console.log("mapUtil entering getGraphMatrixFromCurrentLevel...");
    const level = me.level.getCurrentLevel();
    const layers = level.getLayers();
    var graphMatrix = [];
    for (const layer of layers) {
        if (layer.name === "Background") {
            // melon v19 version
            const tileSetProperties = layer.tileset.tileProperties;
            console.log("mapUtil getGraphMatrixFromCurrentLevel tileset : ");
            console.log(layer.tileset);
            for (let i = 0; i < layer.rows; i++) {
                graphMatrix[i] = [];
                for (let j = 0; j < layer.cols; j++) {
                    let tileId = layer.getTileId(j * level.tilewidth, i * level.tileheight);
                    if (tileSetProperties.get(tileId) != null && tileSetProperties.get(tileId).isWall != null && 
                        tileSetProperties.get(tileId).isWall === true) {
                        graphMatrix[i][j] = 0;
                    }
                    else {
                        graphMatrix[i][j] = 1;
                        walkableGridTiles.push({x : i, y : j});
                    }
                }
            }
        }
    }
    console.log("mapUtil getGraphMatrixFromCurrentLevel graph:");
    console.log(graphMatrix);
    return graphMatrix;
}

/* Convert melon screen coords into grid coords. Important to note
   that grid coords here are the [row][col] of the astar's
   graph structure it uses for pathfinding. Row here is really our Y
   coord and col is the X.
*/
export function screenToGridCoords(x, y) {
    const level = me.level.getCurrentLevel();
    let gridRow, gridCol = -1;

    gridRow = Math.floor(y / level.tileheight);
    gridCol = Math.floor(x / level.tilewidth);

    return {x: gridRow, y: gridCol};
}

export function gridToScreenCoords(gridCoord) {
    const level = me.level.getCurrentLevel();
    let screenX = gridCoord.y * level.tilewidth;
    let screenY = gridCoord.x * level.tileheight;
    return {x: screenX, y: screenY}; 
}

export function getPath(startPoint, endPoint) {

    if (levelMatrix === null) {
        levelMatrix = getGraphMatrixFromCurrentLevel();
    }

    var graph = new Graph(levelMatrix, {diagonal : false});
    let start = graph.grid[startPoint.x][startPoint.y];
    let end = graph.grid[endPoint.x][endPoint.y];
    return astar.search(graph, start, end, {heuristic: astar.heuristics.manhattan});
}

export function getRandomWalkableGridTile(excludePosition) {
    if (excludePosition !== null) {
        let filteredWalkableGridTiles = walkableGridTiles.filter(item => item.x !== excludePosition.x && item.y !== excludePosition.y);
        return filteredWalkableGridTiles[Math.floor(Math.random() * filteredWalkableGridTiles.length)];
    }
    else
        return walkableGridTiles[Math.floor(Math.random() * walkableGridTiles.length)];
}

export function getSpawnPoints(groupName) {
    let spawnPoints = [];
    const level = me.level.getCurrentLevel();
    const objGroups = level.objectGroups;
    for (const group of objGroups) {
        if (group.name === groupName) {
            const groupObjects = group.objects;
            for (const groupObj of groupObjects) {
                spawnPoints.push(groupObj);
            }
        }
    }
    return spawnPoints;
}

