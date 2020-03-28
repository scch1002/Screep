export const spawnerCreateCreep = () => {
    const spawn = Game.spawns['CS'];

    if (spawn.energyCapacity === spawn.energy) {
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
