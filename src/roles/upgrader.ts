export const upgrader = {

    run: (creep: Creep) => {

        creep.say("upgrade");

        const room = Game.spawns['CS'].room;

        if (creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
        }
        if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            if (room.controller && creep.upgradeController(room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            if (creep.carry.energy < creep.carryCapacity) {
                const source = Game.getObjectById(creep.memory.assignedSource) as Source;
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};
