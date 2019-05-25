import { ErrorMapper } from "utils/ErrorMapper";
import { builder} from "./roles/builder";
import { harvester } from "./roles/harvester";
import { assignTask } from "./roles/taskassign";
import { upgrader } from "./roles/upgrader";
import { spawnerCreateCreep } from "./spawner";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

    deleteMemory();

    spawnerCreateCreep();

    for(let name in Game.creeps) {
      const creep = Game.creeps[name];
      assignTask(creep);
    }
});

const deleteMemory = () => {

  for(const name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
};
