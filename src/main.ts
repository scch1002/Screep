import { ErrorMapper } from "utils/ErrorMapper";
import { builder} from "./roles/builder";
import { harvester } from "./roles/harvester";
import { assignTask } from "./roles/taskassign";
import { upgrader } from "./roles/upgrader";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

    refreshCreeps();

    for(let name in Game.creeps) {
      const creep = Game.creeps[name];
      assignTask(creep);
    }
});

const refreshCreeps = () => {

  for(const name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  const spawn = Game.spawns['CS1'];

  if (!_.some(Game.creeps, (creep: any) => creep.memory.role === 'harvester')) {
    spawn.spawnCreep([WORK,CARRY,MOVE], 'harvester',
        {memory: {role: 'harvester'}});
  }

  if (!_.some(Game.creeps, (creep: any) => creep.memory.role === 'builder')) {
    spawn.spawnCreep([WORK,CARRY,MOVE], 'builder',
        {memory: {role: 'builder'}});
  }

  if (!_.some(Game.creeps, (creep: any) => creep.memory.role === 'upgrader')) {
    spawn.spawnCreep([WORK,CARRY,MOVE], 'upgrader',
        {memory: {role: 'upgrader'}});
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
