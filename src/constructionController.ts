
export const constructForRoom = () => {
    const room = Game.spawns['CS'].room;
    const spawn = Game.spawns['CS'];
    const creeps = Game.creeps;

    if (haveMaxCreepsBeenGenerated(creeps, room)) {
        constructRoadsToEnergySources(spawn, room);
    }
}

const constructRoadsToEnergySources = (spawn: any, room: any) => {
    for (let source of room.find(FIND_SOURCES)) {
        const path = PathFinder.search(spawn.pos, source.pos);
        for (let pos of path.path) {
            room.createConstructionSite(pos, STRUCTURE_ROAD);
        }
    }
}

const haveMaxCreepsBeenGenerated = (creeps: any, room: any) => {
    const creepCount = Object.keys(creeps).length;
    const energySourceCount = room.find(FIND_SOURCES).length;

    return creepCount >= energySourceCount * 6;
}
