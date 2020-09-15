import ILayerRegistry from "../interfaces/ILayerRegistry";
import {Filename} from "../interfaces/ISrcFile";
import {LayerLevel, IVALID_LAYER_LEVEL} from "../interfaces/ILayer";
import Layer from "./layer";

interface InternalCacheFileMeta {
  exist: boolean
  level: LayerLevel
}

interface InternalFileCache {
  [fname: string]: InternalCacheFileMeta
}

export default class LayerRegistry implements ILayerRegistry {
  private memo: InternalFileCache = {}

  constructor(private registry: Layer[]) {}

  private isInMemo(fname: Filename): boolean {
    return fname in this.memo
  }

  private getFromMemo(fname: Filename): InternalCacheFileMeta {
    if (this.isInMemo(fname)) {
      return this.memo[fname]
    }
    throw new Error(`Invalid call: ${fname} not in internal LayerRegistry cache`)
  }

  private setNoFileInMemo(fname: Filename) {
    this.memo[fname] = {exist: false, level: IVALID_LAYER_LEVEL}
  }

  private saveFileInMemo(fname: Filename, level: LayerLevel) {
    this.memo[fname] = {exist: true, level}
  }

  isFileFromRegistry(fname: Filename): boolean {
    if (this.isInMemo(fname)) {
      const inMemo = this.getFromMemo(fname)
      return inMemo.exist
    }

    const matchedLayers = this.registry.filter((layer: Layer) => layer.isFilenameFromLayer(fname))
    if (matchedLayers.length === 0) {
      this.setNoFileInMemo(fname)
      return false
    }

    if (matchedLayers.length > 1) {
      const layersNames = matchedLayers.map((layer) => layer.name).join(', ')
      throw new Error(`Ambiguous file ${fname} match for layers: ${layersNames}`)
    }

    const exactLayer = matchedLayers[0]
    this.saveFileInMemo(fname, exactLayer.level)
    return true
  }

  getLayerLevelForFile(fname: Filename): LayerLevel {
    if (this.isFileFromRegistry(fname)) {
      const inMemo = this.getFromMemo(fname)
      return inMemo.level
    }
    //return IVALID_LAYER_LEVEL
    throw new Error(`Invalid call: no file ${fname} in registry`)
  }
}