export const builder = {

    run: (creep: Creep) => {

        creep.say("build");

        const room = Game.spawns['CS'].room;

        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            const targets = room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else {
            if (creep.carry.energy < creep.carryCapacity) {
                if (creep.memory.assignedSource) {
                    const source = Game.getObjectById(creep.memory.assignedSource) as Source;
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                } else {
                    const sources = creep.room.find(FIND_SOURCES);
                    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
        }
    }
};
