import { builder } from "./roles/builder";
import { harvester } from "./roles/harvester";
import { upgrader } from "./roles/upgrader";


export const assignWork = () => {
    const room = Game.spawns['CS'].room;
    let correctAssignmentCount = generateWorkTypeCounts(Game.creeps, room);
    console.log(JSON.stringify(correctAssignmentCount))
    adjustWorkerAllocation(Game.creeps, correctAssignmentCount, room);
    directWorkers(Game.creeps)
}

const generateWorkTypeCounts = (creeps: any, room: any) => {
    const creepCount = Object.keys(creeps).length;

    if (haveMaxCreepsBeenGenerated(creeps, room) && room.energyCapacityAvailable === room.energyAvailable) {
        return {
            harvesterCount: creepCount * 0,
            upgraderCount: creepCount * 1
        }
    }

    return {
        harvesterCount: creepCount * .6,
        upgraderCount: creepCount * .4
    }
}

const adjustWorkerAllocation = (creeps: any, workAssignments: any, room: any) => {
    const creepCount = Object.keys(creeps).length;
    let currentHarvesterCount = 0;
    let currentUpgraderCount = 0;

    for (let name in creeps) {
        const creep = creeps[name];

        if (creep.memory.role === 'builder' && creepCount === 1) {
            creep.memory.role = 'harvester';
        }

        if (creep.memory.role === 'upgrader' && currentUpgraderCount >= workAssignments.upgraderCount) {
            creep.memory.role = 'harvester';
        } else if (creep.memory.role === 'upgrader') {
            currentUpgraderCount++;
        } else if (creep.memory.role === 'harvester' && currentHarvesterCount >= workAssignments.harvesterCount) {
            creep.memory.role = 'upgrader';
        } else {
            currentHarvesterCount++;
        }
    }

    if (!canBuild(room) || isBuilderPresent(creeps)) {
        return;
    }

    for (let name in creeps) {
        const creep = creeps[name];
        if (creep.memory.role === 'upgrader') {
            creep.memory.role = 'builder';
            break;
        }
    }
}

const directWorkers = (creeps: any) => {
    for (let name in creeps) {
        const creep = creeps[name];
        assignTask(creep);
    }
};

const assignTask = (creep: any) => {
    const role = creep.memory.role;

    if (role === 'builder') {
        if (canBuild(creep.room)) {
            builder.run(creep);
        }
        else if (canHarvest(creep.room)) {
            harvester.run(creep);
        }
        else {
            upgrader.run(creep);
        }
    } else if (role === 'harvester') {
        if (canHarvest(creep.room)) {
            harvester.run(creep);
        }
        else if (canBuild(creep.room)) {
            builder.run(creep);
        }
        else {
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

const haveMaxCreepsBeenGenerated = (creeps: any, room: any) => {
    const creepCount = Object.keys(creeps).length;
    const energySourceCount = room.find(FIND_SOURCES).length;

    return creepCount >= energySourceCount * 6;
}

const isBuilderPresent = (creeps: any) => {
    for (let name in creeps) {
        const creep = creeps[name];
        if (creep.memory.role === 'builder') {
            return true;
        }
    }

    return false;
}
