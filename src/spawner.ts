export const spawnerCreateCreep = () => {
    const spawn = Game.spawns['CS1'];

    if (!_.some(Game.creeps, (creep: any) => creep.memory.role === 'builder')) {
        spawn.spawnCreep([WORK,CARRY,MOVE], 'builder',
            {memory: {role: 'builder'} as CreepMemory});
    }

    if (!_.some(Game.creeps, (creep: any) => creep.memory.role === 'upgrader')) {
        spawn.spawnCreep([WORK,CARRY,MOVE], 'upgrader',
            {memory: {role: 'upgrader'} as CreepMemory});
    }

    if (spawn.energyCapacity === spawn.energy) {
        spawn.spawnCreep([WORK,CARRY,MOVE], 'Harvester' + Game.time,
            {memory: {role: 'harvester'} as CreepMemory});
    }

    if(spawn.spawning) {
        var spawningCreep = spawn.spawning && Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }
};