export const spawnerCreateCreep = () => {
    const spawn = Game.spawns['CS'];
    const creeps = Game.creeps;
    const room = Game.spawns['CS'].room;

    cullCreeps(creeps, room);

    if (!haveMaxCreepsBeenGenerated(creeps, room) && spawn.energyCapacity === spawn.energy) {
        spawn.spawnCreep([WORK, CARRY, MOVE], 'Worker' + Game.time,
            { memory: { type: 'worker', role: 'harvester' } as CreepMemory });
    }

    if (spawn.spawning) {
        var spawningCreep = spawn.spawning && Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            { align: 'left', opacity: 0.8 });
    }
};

const haveMaxCreepsBeenGenerated = (creeps: any, room: any) => {
    const creepCount = Object.keys(creeps).length;
    console.log(creepCount);
    const energySourceCount = room.find(FIND_SOURCES).length;

    return creepCount >= energySourceCount * 6;
}

const cullCreeps = (creeps: any, room: any) => {
    const correctCreepCount = room.find(FIND_SOURCES).length * 6;
    let creepCount = Object.keys(creeps).length;
    if (correctCreepCount >= creepCount) {
        return;
    }

    for (let name in creeps) {
        const creep = creeps[name];
        creep.suicide()
        creepCount--;
        if (creepCount <= correctCreepCount) {
            break;
        }
    }
}
