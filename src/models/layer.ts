import {ILayer, LayerLevel} from "../interfaces/iLayer";
import {IModule} from "../interfaces/iModule";

export default class Layer implements ILayer {
  constructor(
    public readonly name: string,
    private readonly modules: IModule[],
    public readonly level: LayerLevel
  ) {}

  isFilenameFromLayer(fname: string): boolean {
    const isBelongsToModule = (module: IModule) => module.isFilenameFromModule(fname)
    return this.modules.some(isBelongsToModule)
  }

  isModuleFromLayer(module: IModule): boolean {
    return this.modules.includes(module)
  }

  isInnerLayer(layer: ILayer): boolean {
    return layer.level < this.level
  }

  isOuterLayer(layer: ILayer): boolean {
    return layer.level > this.level
  }
}