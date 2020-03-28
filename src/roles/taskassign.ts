import { builder } from "./builder";
import { harvester } from "./harvester";
import { upgrader } from "./upgrader";

export const assignTask = (creep: any) => {
    const role = creep.memory.role;


};

const canBuild = (room: Room) => room.find(FIND_MY_CONSTRUCTION_SITES).length > 0

const canHarvest = (room: Room) => room.find(FIND_SOURCES)
    .filter(f => f.energy > 100)
    .length > 0 && room.energyCapacityAvailable > 0;
