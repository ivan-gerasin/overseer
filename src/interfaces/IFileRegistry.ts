import {Filename} from "./ISrcFile";

export default interface IFileRegistry {
  // registerFile: (fname: Filename) => void
  isDependencyValid: (fname: Filename, imports: Filename[]) => boolean
}