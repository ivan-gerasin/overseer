import ISrcFile, {Filename} from "../interfaces/ISrcFile";
import {LayerLevel} from "../interfaces/ILayer";

export default class SrcFile implements ISrcFile {
  constructor(readonly name: Filename, readonly level: LayerLevel) {}
  canImportFile(file: ISrcFile): boolean {
    return this.level === file.level || this.level > file.level
  }
  canBeExporterBy(file: ISrcFile): boolean {
    return this.level === file.level || this.level < file.level
  }
}