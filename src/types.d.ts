// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  type: string;
  assignedSource: string;
  building: boolean;
  upgrading: boolean;
}

interface RoomMemory {
  sources: source[]
}

interface Memory {
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}

interface source {
  workers: string[]
}
