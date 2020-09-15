import {LayerLevel} from "./ILayer";

export type Filename = string
export default interface ISrcFile {
  readonly name: Filename
  readonly level: LayerLevel
  canImportFile: (fname: ISrcFile) => boolean
  canBeExporterBy: (fname: ISrcFile) => boolean
}