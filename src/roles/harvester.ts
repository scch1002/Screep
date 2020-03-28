export const harvester = {
    run: (creep: Creep) => {

        creep.say("harvest");

        if (creep.carry.energy < creep.carryCapacity) {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if (creep.transfer(Game.spawns['CS'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['CS']);
            }
        }
    }

};
