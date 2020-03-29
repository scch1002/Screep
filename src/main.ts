import { ErrorMapper } from "utils/ErrorMapper";
import { spawnerCreateCreep } from "./spawner";
import { assignWork } from './workAssignmentControler'
import { constructForRoom } from './constructionController'

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  deleteMemory();

  spawnerCreateCreep();

  assignWork()

  constructForRoom()
});

const deleteMemory = () => {

  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      removeCreepFromSourceAssignment(name);
      console.log('Clearing non-existing creep memory:', name);
    }
  }
};

const removeCreepFromSourceAssignment = (name: string) => {
  const room = Game.spawns['CS'].room;

  for (let source of room.memory.sources) {
    for (let worker of source.workers) {
      if (worker === name) {
        _.remove(source.workers, (w: string) => w === name)
      }
      break;
    }
  }
}
