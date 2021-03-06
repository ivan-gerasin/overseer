import {ILayer, LayerLevel} from "../interfaces/ILayer";
import {IModule} from "../interfaces/IModule";
import {IConfigLayer} from "../interfaces/IConfig";
import {Module} from "./module";
import {Filename} from "../interfaces/ISrcFile";

export default class Layer implements ILayer {
  constructor(
    public readonly name: string,
    private readonly modules: IModule[],
    public readonly level: LayerLevel
  ) {}

  static fromConfig(rawLayer: IConfigLayer, level: LayerLevel): Layer {
    const modules = rawLayer.modules.map(rawModule => Module.fromConfig(rawModule))
    return new Layer(rawLayer.name, modules, level)
  }

  isFilenameFromLayer(fname: Filename): boolean {
    const isBelongsToModule = (module: IModule) => module.isFilenameFromModule(fname)
    return this.modules.some(isBelongsToModule)
  }

  isInnerLayer(layer: ILayer): boolean {
    return layer.level < this.level
  }

  isOuterLayer(layer: ILayer): boolean {
    return layer.level > this.level
  }
}