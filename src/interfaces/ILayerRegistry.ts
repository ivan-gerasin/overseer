import {Filename} from "./ISrcFile";
import {LayerLevel} from "./ILayer";

export default interface ILayerRegistry {
  isFileFromRegistry: (fname: Filename) => boolean
  getLayerLevelForFile: (fname: Filename) => LayerLevel
}