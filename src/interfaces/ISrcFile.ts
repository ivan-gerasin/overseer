import {LayerLevel} from "./ILayer";

export type Filename = string
export default interface IFile {
  readonly name: Filename
  readonly level: LayerLevel
  canImportFile: (fname: IFile) => boolean
  canBeExporterBy: (fname: IFile) => boolean
}