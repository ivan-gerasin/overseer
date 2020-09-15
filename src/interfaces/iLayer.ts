import {IModule} from "./iModule";

export type LayerLevel = number
export interface ILayer {
  name: string
  level: LayerLevel
  isFilenameFromLayer: (fname: string) => boolean
  isModuleFromLayer: (module: IModule) => boolean
  isInnerLayer: (layer: ILayer) => boolean
  isOuterLayer: (layer: ILayer) => boolean
}

