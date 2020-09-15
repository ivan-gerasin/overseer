export type InvalidLayerLevel = -1
export const IVALID_LAYER_LEVEL: InvalidLayerLevel = -1
export type LayerLevel = number | InvalidLayerLevel
export interface ILayer {
  name: string
  level: LayerLevel
  isFilenameFromLayer: (fname: string) => boolean
  isInnerLayer: (layer: ILayer) => boolean
  isOuterLayer: (layer: ILayer) => boolean
}

