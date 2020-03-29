export const harvester = {
    run: (creep: Creep) => {

        creep.say("harvest");

        const room = Game.spawns['CS'].room;

        if (room.memory.sources === null || room.memory.sources === undefined) {
            initializeRoomSources(room)
        }

        if (!creep.memory.assignedSource) {
            assignWorkerToSource(creep, room);
        }

        if (creep.carry.energy < creep.carryCapacity) {
            const source = Game.getObjectById(creep.memory.assignedSource) as Source;
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            if (creep.transfer(Game.spawns['CS'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['CS']);
            }
        }
    }

};


const initializeRoomSources = (room: any) => {
    room.memory.sources = [];
    for (let source of room.find(FIND_SOURCES)) {
        room.memory.sources.push({
            id: source.id,
            workers: []
        })
    }
}

const assignWorkerToSource = (creep: any, room: any) => {
    const sources = room.memory.sources;

    for (let source of sources) {
        if (source.workers.length === 6) {
            continue;
        }
        source.workers.push(creep.name);
        creep.memory.assignedSource = source.id;
        break;
    }
}
