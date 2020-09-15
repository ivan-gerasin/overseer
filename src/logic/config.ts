import Layer from "../models/layer";
import {IConfigLayer, IConfigModule, IOverseerConfig} from "../interfaces/IConfig";
import {Module} from "../models/module";
import Matcher from "../models/matcher";


export function moduleFromConfig(module: IConfigModule): Module {
  const newMatcher = new Matcher(module.matchers)
  return new Module(module.name, newMatcher)
}

export function layersFromConfig(config: IOverseerConfig): Layer[] {
  return config.layers.map((layerConf: IConfigLayer, layerLevel: number) => {
    const modules: Module[] = layerConf.modules.map(moduleFromConfig)
    return new Layer(layerConf.name, modules, layerLevel)
  })
}