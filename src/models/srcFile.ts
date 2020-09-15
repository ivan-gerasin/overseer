import IFile, {Filename} from "../interfaces/IFile";
import {LayerLevel} from "../interfaces/ILayer";

export default class File implements IFile {
  constructor(readonly name: Filename, readonly level: LayerLevel) {}
  canImportFile(file: IFile): boolean {
    return this.level === file.level || this.level > file.level
  }
  canBeExporterBy(file: IFile): boolean {
    return this.level === file.level || this.level < file.level
  }
}