import { builder } from "./builder";
import { harvester } from "./harvester";
import { upgrader } from "./upgrader";

export const assignTask = (creep: any) => {
    const role = creep.memory.role;

    if (role === 'builder') {
        if (canBuild(creep.room)) {
            builder.run(creep);
        }
        else if (canHarvest(creep.room)) {
            harvester.run(creep);
        }
        else  {
            upgrader.run(creep);
        }
    } else if (role === 'harvester') {
        if (canHarvest(creep.room)) {
            harvester.run(creep);
        }
        else if (canBuild(creep.room)) {
            builder.run(creep);
        }
        else  {
            upgrader.run(creep);
        }
    } else {
        upgrader.run(creep);
    }
};

const canBuild = (room: Room) => room.find(FIND_MY_CONSTRUCTION_SITES).length > 0

const canHarvest = (room: Room) => room.find(FIND_SOURCES)
    .filter(f => f.energy > 100)
    .length > 0 && room.energyCapacityAvailable > 0;
